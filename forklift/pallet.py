#!/usr/bin/env python
# * coding: utf8 *
'''
pallet.py
A module that handles the forklifting for the project
'''

import csv
import os
from pathlib import Path

import pandas as pd
import requests
import sqlalchemy
from xxhash import xxh64

from forklift.models import Pallet

from .models import schema
from .vault import api, database


class CorrectionPallet(Pallet):

    def build(self, configuration='Production'):
        self.corrections = Path(self.staging_rack) / 'corrections'
        self.hash = self.corrections / 'hash'
        self.dirty = None

    def requires_processing(self):
        if self.dirty is not None:
            return self.dirty

        self.corrections.mkdir(exist_ok=True)

        current_hash = self.get_hash()
        new_data_hash = self.get_data()

        self.dirty = current_hash != new_data_hash

        return self.dirty

    def process(self):
        dat_file = os.path.join(self.corrections, self.data)
        stats = os.stat(dat_file)
        success = True

        try:
            self.log.info('converting offender data')
            frame = pd.read_csv(
                dat_file,
                sep='|',
                engine='python',
                quoting=csv.QUOTE_NONE,
                names=schema.FIELDS,
                header=None,
                converters=schema.CONVERTERS,
                # nrows=10,  #: for testing
            ).iloc[:, :-1]

            self.log.debug(frame.info())

            cwd = Path()

            add_shape = (cwd / 'sql' / 'alter_shape.sql').read_text()
            create_shapes = (cwd / 'sql' / 'create_shape.sql').read_text()
            add_pk = (cwd / 'sql' / 'create_primary_key.sql').read_text()
            add_indexes = (cwd / 'sql' / 'create_indexes.sql').read_text()

            #: load new data
            engine = sqlalchemy.create_engine(database.CONNECTION_AT)

            with engine.connect() as connection:
                self.log.info('inserting offender data')
                frame.to_sql(
                    'offenders',
                    engine,
                    if_exists='replace',
                    index=False,
                    chunksize=5000,
                    dtype=schema.TYPES,
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
            self.success = (False, 'unable to read csv and write data to sql')
            success = False
        finally:
            if os.path.exists(dat_file):
                with open(dat_file, 'w') as dat:
                    dat.truncate()

                if success:
                    #: reset access stats from truncate
                    os.utime(dat_file, (stats.st_atime, stats.st_mtime))
                else:
                    #: reset stats to original because errors
                    os.utime(dat_file, (self.data_stats.st_atime, stats.st_mtime))

    def is_dat(self, file_path):
        return os.path.basename(file_path).lower() == self.data

    def remove(self, file_path):
        if os.path.exists(file_path):
            os.remove(file_path)

    def update_hash(self, hash_value):
        hash_file = self.corrections / 'hash'
        hash_file.write_text(hash_value)

    def get_hash(self):
        prior_hash_file = self.corrections / 'hash'

        prior_hash = None

        if prior_hash_file.exists():
            prior_hash = prior_hash_file.read_text()

        return prior_hash

    def get_data(self):
        response = requests.get(
            'https://secure.corrections.utah.gov/otrackws_qa/rest/fieldmap/offenders',
            headers=api.AUTHORIZATION_HEADER,
            stream=True
        )

        try:
            response.raise_for_status()
        except Exception as e:
            self.success = (False, 'API failure')
            self.log.fatal(e)

            return False

        content_hash = xxh64()
        with (self.corrections / 'offenders.json').open(mode='wb') as cursor:
            for chunk in response.iter_content(chunk_size=128):
                cursor.write(chunk)
                content_hash.update(chunk)

        return content_hash
