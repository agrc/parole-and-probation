#!/usr/bin/env python
# * coding: utf8 *
'''
pallet.py
A module that handles the forklifting for the project
'''

from pathlib import Path

import pandas as pd
import requests
import sqlalchemy
from vault import api, database
from xxhash import xxh64

from forklift.models import Pallet
from models import schema


class CorrectionPallet(Pallet):

    def build(self, configuration='Production'):
        self.corrections = Path(self.staging_rack) / 'corrections'
        self.hash = self.corrections / 'hash'
        self.offenders = self.corrections / 'offenders.json'
        self.dirty = None
        self.hash_digest = None

        self.api = api.ENDPOINT
        self.db = database.CONNECTION

        if configuration == 'Dev':
            self.api = api.ENDPOINT_AT
            self.db = database.CONNECTION_LOCAL

        if configuration == 'Staging':
            self.api = api.ENDPOINT_AT
            self.db = database.CONNECTION_AT

    def requires_processing(self):
        if self.dirty is not None:
            return self.dirty

        self.corrections.mkdir(exist_ok=True)

        current_hash = self.get_hash()
        self.hash_digest = self.get_data()

        self.dirty = current_hash != self.hash_digest
        self.log.info(f'database refresh required: {self.dirty}')

        if not self.dirty:
            try:
                self.offenders.unlink()
            except FileNotFoundError:
                pass

        return self.dirty

    def get_data(self):
        self.log.info('requesting api data')
        response = requests.get(self.api, headers=api.AUTHORIZATION_HEADER, stream=True)

        try:
            response.raise_for_status()
        except Exception as e:
            self.success = (False, 'API failure')
            self.log.fatal(e)

            return False

        self.log.debug('streaming data')

        content_hash = xxh64()
        with (self.corrections / 'offenders.json').open(mode='wb') as cursor:
            for chunk in response.iter_content(chunk_size=128):
                cursor.write(chunk)
                content_hash.update(chunk)

        return content_hash.hexdigest()

    def get_hash(self):
        prior_hash_file = self.corrections / 'hash'

        prior_hash = ''

        if prior_hash_file.exists():
            prior_hash = prior_hash_file.read_text()

        return prior_hash

    def process(self):
        success = True

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

            cwd = Path(__file__).parent

            add_shape = (cwd / 'sql' / 'alter_shape.sql').read_text()
            create_shapes = (cwd / 'sql' / 'create_shape.sql').read_text()
            add_pk = (cwd / 'sql' / 'create_primary_key.sql').read_text()
            add_indexes = (cwd / 'sql' / 'create_indexes.sql').read_text()

            #: load new data
            engine = sqlalchemy.create_engine(self.db)

            with engine.connect() as connection:
                self.log.info('inserting offender data')
                frame.to_sql(
                    'offenders',
                    engine,
                    if_exists='replace',
                    index=False,
                    chunksize=5000,
                    dtype=schema.SQL_TYPES,
                )

                self.log.debug('adding primary key')
                connection.execution_options(autocommit=True).execute(add_pk)
                self.log.debug('creating shape field')
                connection.execution_options(autocommit=True).execute(add_shape)
                self.log.debug('populating shape field')
                connection.execution_options(autocommit=True).execute(create_shapes)
                self.log.debug('adding indexes')
                connection.execution_options(autocommit=True).execute(add_indexes)
        except Exception as e:
            self.log.fatal(e)
            self.success = (False, 'unable to read api and write data to sql')
            success = False
        finally:
            self.log.info('completed')

            try:
                self.offenders.unlink()
            except FileNotFoundError:
                pass

            if success:
                self.log.debug('updating hash')
                self.update_hash(self.hash_digest)

    def update_hash(self, hash_value):
        hash_file = self.corrections / 'hash'
        hash_file.write_text(hash_value)


if __name__ == '__main__':
    import logging

    pallet = CorrectionPallet()

    logging.basicConfig(
        format='%(levelname)s %(asctime)s %(lineno)s %(message)s', datefmt='%H:%M:%S', level=logging.DEBUG
    )
    pallet.log = logging

    pallet.build('Dev')

    if pallet.requires_processing():
        pallet.process()
