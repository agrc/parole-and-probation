#!/usr/bin/env python
# * coding: utf8 *
'''
pallet.py
A module that handles the forklifting for the project
'''

from pathlib import Path
from typing import List

import numpy as np
import pandas as pd
import pyproj
import requests
import sqlalchemy
from vault import api, database
from xxhash import xxh64

from forklift.models import Pallet
from models import schema


class CorrectionsBase(Pallet):
    """the base pallet for offender, agent, and supervisor pallets
    """

    def get_data(self, endpoint: str) -> str:
        """makes a request to the endpoint
        writes the data to a json file named after the endpoint
        and returns the hashed value of the content or a 'Fail' constant on failure
        """
        self.log.info(f'requesting api data for {endpoint}')
        response = requests.get(f'{self.api}/{endpoint}', headers=api.AUTHORIZATION_HEADER, stream=True)

        try:
            response.raise_for_status()
        except Exception as error:
            self.success = (False, f'DOC API {endpoint} endpoint failure')
            self.log.fatal(error)

            return 'Fail'

        self.log.debug('streaming data')

        content_hash = xxh64()
        with (self.corrections / f'{endpoint}.json').open(mode='wb') as cursor:
            for chunk in response.iter_content(chunk_size=128):
                cursor.write(chunk)
                content_hash.update(chunk)

        return content_hash.hexdigest()

    def get_hash(self, filename: str) -> str:
        """reads the text from the filename and returns the value stored
        """
        prior_hash_file = self.corrections / filename

        prior_hash = ''

        if prior_hash_file.exists():
            prior_hash = prior_hash_file.read_text()

        return prior_hash

    def update_hash(self, filename: str, hash_value: str):
        """writes the hash_value to the filename
        """
        hash_file = self.corrections / filename
        hash_file.write_text(hash_value)


class CorrectionOffenderPallet(CorrectionsBase):
    """the forklift pallet for offenders
    """

    def __init__(self):
        super(CorrectionOffenderPallet, self).__init__()

        self.corrections = Path(self.staging_rack) / 'corrections'
        self.hash = self.corrections / 'offenders'
        self.offenders = self.corrections / 'offenders.json'
        self.dirty = None
        self.hash_digest = ''
        self.hash_name = 'offenders'

        self.api = api.ENDPOINT
        self.database = database.CONNECTION

    def build(self, configuration='Production'):
        """called when forklift builds the pallet
        """
        if configuration == 'Dev':
            self.api = api.ENDPOINT
            self.database = database.CONNECTION_LOCAL

        if configuration == 'Staging':
            self.api = api.ENDPOINT_AT
            self.database = database.CONNECTION_AT

    def requires_processing(self):
        """makes api requests for offenders
        on the first run, it saves the hash to disk and returns dirty
        on subsequent requests, the hash is compared and the dirty result is returned based on the comparison
        """
        if self.dirty is not None:
            return self.dirty

        self.corrections.mkdir(exist_ok=True)

        current_hash = self.get_hash(self.hash_name)
        self.hash_digest = self.get_data(self.hash_name)

        self.dirty = current_hash != self.hash_digest
        self.log.info(f'database refresh required: {self.dirty}')

        if not self.dirty:
            try:
                self.offenders.unlink()
            except FileNotFoundError:
                pass

        return self.dirty

    def process(self):
        """executed when requires_processing is true
        the offender data are transformed, combined, and stored in a database
        """
        success = True
        lat_long = pyproj.CRS.from_epsg(4326)
        web_mercator = pyproj.CRS.from_epsg(3857)
        transformer = pyproj.Transformer.from_crs(lat_long, web_mercator, always_xy=True)

        def convert_special_supervision(code):
            return code.casefold().replace('-', '').replace(' ', '')

        try:
            self.log.info('converting offender data')
            frame = pd.read_json(
                self.offenders,
                orient='records',
                dtype=schema.DATA_TYPES,
                convert_dates=True,
            )
            for special_supervision in schema.SPECIAL_SUPERVISION:
                frame[convert_special_supervision(special_supervision)
                     ] = frame.special_supervision.apply(lambda value: special_supervision in value)

            frame.drop(columns=['special_supervision'], inplace=True)

            frame[['web_x',
                   'web_y']] = frame[['x',
                                      'y']].apply(lambda df: pd.Series(transformer.transform(df[0], df[1])), axis=1)

            frame.replace([np.inf, -np.inf], np.nan, inplace=True)
            frame = frame[frame['web_x'].notna()]

            frame['county'].fillna(value='', inplace=True)
            frame['employer_address'] = frame['employer_address'].str.slice(0, 59)
            frame['alerts'] = frame['alerts'].str.slice(0, 500)

            cwd = Path(__file__).parent

            add_shape = (cwd / 'sql' / 'alter_shape.sql').read_text()
            create_shapes = (cwd / 'sql' / 'create_shape.sql').read_text()
            add_pk = (cwd / 'sql' / 'create_primary_key.sql').read_text()
            add_indexes = (cwd / 'sql' / 'create_indexes.sql').read_text()

            #: load new data
            engine = sqlalchemy.create_engine(self.database)

            with engine.connect() as connection:
                self.log.info('inserting offender data')
                frame.to_sql(
                    'offenders',
                    connection,
                    if_exists='replace',
                    index=False,
                    chunksize=1,
                    dtype=schema.SQL_TYPES,
                )

                with connection.begin():
                    self.log.debug('adding primary key')
                    connection.execute(sqlalchemy.text(add_pk))
                    self.log.debug('creating shape field')
                    connection.execute(sqlalchemy.text(add_shape))
                    self.log.debug('populating shape field')
                    connection.execute(sqlalchemy.text(create_shapes))
                    self.log.debug('adding indexes')
                    connection.execute(sqlalchemy.text(add_indexes))
        except Exception as error:
            self.log.fatal(error)
            self.success = (False, 'unable to read api and write data to sql')
            success = False
        finally:
            self.log.info('completed')

            try:
                self.offenders.unlink()
            except FileNotFoundError:
                pass

            if success:
                self.log.debug('updating offender hash')
                self.update_hash(self.hash_name, self.hash_digest)


class CorrectionSupplementaryPallet(CorrectionsBase):
    """a forklift pallet to get agent and supervisor data
    """

    def __init__(self):
        super(CorrectionSupplementaryPallet, self).__init__()

        self.corrections = Path(self.staging_rack) / 'corrections'
        self.hash = ''
        self.hash_name = 'combined_agent_supervisor'

        self.agent_data = self.corrections / 'agents.json'
        self.supervisor_data = self.corrections / 'supervisors.json'

        self.api = api.ENDPOINT
        self.database = database.CONNECTION

    def build(self, configuration='Production'):
        """called when forklift builds the pallet
        """
        if configuration == 'Dev':
            self.api = api.ENDPOINT
            self.database = database.CONNECTION_LOCAL

        if configuration == 'Staging':
            self.api = api.ENDPOINT_AT
            self.database = database.CONNECTION_AT

    def requires_processing(self):
        """makes api requests for agents and supervisors
        on the first run, it saves the combined hash to disk and returns dirty
        on subsequent requests, the hash is compared and the dirty result is returned based on the comparison
        """
        self.corrections.mkdir(exist_ok=True)

        self.hash = self.get_hash(self.hash_name)

        new_agent_hash = self.get_data('agents')
        new_supervisor_hash = self.get_data('supervisors')

        new_hash = self.combine_hash([new_agent_hash, new_supervisor_hash])

        dirty = new_hash != self.hash

        self.log.info(f'agents or supervisors have changed: {dirty}')

        if dirty:
            self.hash = new_hash
        else:
            self.clean_up()

        return dirty

    def process(self):
        """executed when requires_processing is true
        the agent and supervisor data are transformed, combined, and stored in a database
        """
        agent_frame = None
        supervisor_frame = None
        success = True

        if not self.agent_data.exists() or not self.supervisor_data.exists():
            self.success = (False, 'agent and supervisor data is not available')
            self.clean_up()

            return

        try:
            self.log.info('reading agent data')
            agent_frame = pd.read_json(self.agent_data, orient='records')
            agent_frame.rename(columns={'agent_name': 'value', 'agent_st_id_num': 'id'}, inplace=True)
            agent_frame.sort_values(by=['value'], inplace=True)

            self.log.info('reading supervisor data')
            supervisor_frame = pd.read_json(self.supervisor_data, orient='records')
            supervisor_frame.rename(columns={'supervisor_name': 'supervisor'}, inplace=True)
            supervisor_frame.sort_values(by=['supervisor'], inplace=True)
        except Exception as error:
            self.log.fatal(error)
            self.success = (False, 'unable to read agent and supervisor data')
            success = False
        finally:
            self.log.info('completed')

        if not success or agent_frame is None or supervisor_frame is None:
            self.clean_up()

            return

        agents_and_supervisors = agent_frame.merge(supervisor_frame, left_on='supervisor_id', right_on='supervisor_id')
        agents_and_supervisors.set_index('id', inplace=True)

        try:
            engine = sqlalchemy.create_engine(self.database)

            with engine.connect():
                self.log.info('inserting combined data')
                agents_and_supervisors.to_sql(
                    'agents',
                    engine,
                    if_exists='replace',
                    index=True,
                    chunksize=5000,
                    dtype=schema.AGENT_SQL_TYPES,
                )
        except Exception as error:
            self.log.fatal(error)
            self.success = (False, 'unable to read api and write data to sql')
            success = False
        finally:
            self.log.info('completed')

        self.clean_up()

        if success:
            self.log.debug('updating combined hash')
            self.update_hash(self.hash_name, self.hash)

    def combine_hash(self, items: List) -> str:
        """hashes the values in the items array
        """

        content_hash = xxh64()
        _ = [content_hash.update(item) for item in items]

        return content_hash.hexdigest()

    def clean_up(self):
        """remove sensitive data from disk
        """
        try:
            self.agent_data.unlink()
        except FileNotFoundError:
            pass

        try:
            self.supervisor_data.unlink()
        except FileNotFoundError:
            pass


if __name__ == '__main__':
    import logging

    pallet = CorrectionOffenderPallet()

    logging.basicConfig(
        format='%(levelname)s %(asctime)s %(lineno)s %(message)s', datefmt='%H:%M:%S', level=logging.DEBUG
    )
    pallet.log = logging

    pallet.build()

    if pallet.requires_processing():
        pallet.process()

    pallet2 = CorrectionSupplementaryPallet()
    pallet2.log = logging

    pallet2.build()

    if pallet2.requires_processing():
        pallet2.process()
