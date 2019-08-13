#!/usr/bin/env python
# * coding: utf8 *
'''
pallet.py
A module that handles the forklifting for the project
'''

import csv
import os

import pandas as pd
import pysftp
import sqlalchemy

from forklift.models import Pallet
from models import schema
from vault import database, ftp


class CorrectionPallet(Pallet):

    def build(self, configuration='Production'):
        self.corrections = os.path.join(self.staging_rack, 'corrections')
        self.data = 'udc_ofndr.dat'
        self.dirty = None

    def requires_processing(self):
        if self.dirty is not None:
            return self.dirty

        #: if folder never exists, expect first run and the crate has changes
        data = os.path.join(self.corrections, self.data)

        if not os.path.exists(self.corrections) or not os.path.exists(data):
            os.makedirs(self.corrections, exist_ok=True)
            self.get_files()

            self.data_stats = os.stat(data)

            self.dirty = True

            return True

        #: get mtime from current file
        self.data_stats = os.stat(data)
        last_modified = self.data_stats.st_mtime

        #: connect to sft, check mtime on remote file, replace if newer
        self.dirty = self.get_files(mtime=last_modified)

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

            add_shape = '''IF NOT EXISTS (
  SELECT *
  FROM   sys.columns
  WHERE  object_id = OBJECT_ID('[offenders]')
         AND name = 'shape'
)
  ALTER TABLE [offenders] ADD [shape] geography
'''
            create_shapes = '''UPDATE [offenders]
SET [offenders].[shape] = geography::STGeomFromText('POINT(' + CONVERT(varchar, [offenders].[x]) + ' ' + CONVERT(varchar, [offenders].[y]) + ')', 4326)'''

            add_pk = '''IF NOT EXISTS (
  SELECT *
  FROM   sys.columns
  WHERE  object_id = OBJECT_ID('[offenders]')
         AND name = 'id'
)
  ALTER TABLE [offenders] ADD [id] int NOT NULL IDENTITY (1,1)
  GO

  ALTER TABLE [DOCOAdmin].[offenders]
  ADD CONSTRAINT [PK_id] primary key(id);
            '''

            add_indexes = '''IF EXISTS(SELECT * FROM sys.indexes WHERE object_id = object_id('[DOCOAdmin].[offenders]') AND NAME ='IX_offender_shape')
    DROP INDEX [IX_offender_shape] ON [DOCOAdmin].[offenders];

    IF EXISTS(SELECT * FROM sys.indexes WHERE object_id = object_id('[DOCOAdmin].[offenders]') AND NAME ='PK_id')
        ALTER TABLE [DOCOAdmin].[offenders]
        DROP CONSTRAINT [PK_id];

    IF EXISTS(SELECT * FROM sys.indexes WHERE object_id = object_id('[DOCOAdmin].[offenders]') AND NAME ='IX_offender_offender_id')
        DROP INDEX [IX_offender_offender_id] ON [DOCOAdmin].[offenders];

    IF EXISTS(SELECT * FROM sys.indexes WHERE object_id = object_id('[DOCOAdmin].[offenders]') AND NAME ='IX_offender_agent_id')
        DROP INDEX [IX_offender_agent_id] ON [DOCOAdmin].[offenders];

    ALTER TABLE [DOCOAdmin].[offenders]
    ADD CONSTRAINT [PK_id] primary key(id);

    CREATE UNIQUE NONCLUSTERED INDEX [IX_offender_offender_id]
    ON [DOCOAdmin].[offenders] ([offender_id] ASC)

    CREATE NONCLUSTERED INDEX [IX_offender_agent_id]
    ON [DOCOAdmin].[offenders] ([agent_id] ASC)

    CREATE SPATIAL INDEX [IX_offender_shape]
    ON [DOCOAdmin].[offenders]([shape])
    '''
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

    def get_files(self, mtime=0):
        with pysftp.Connection(**ftp.CREDENTIALS) as sftp:
            sftp.chdir('/upload')
            items = sftp.listdir()

            self.log.debug('found {}'.format(','.join(items)))

            offender_data = [item for item in items if self.is_dat(item)]

            self.log.debug('filtered to {}'.format(','.join(offender_data)))
            if len(offender_data) == 0:
                self.log.warn('no dat files found')

                self.success = (False, 'no dat files found')

                return

            for file_path in offender_data:
                local_path = os.path.join(self.corrections, os.path.basename(file_path))
                if mtime > 0:
                    self.log.debug('checking {}'.format(file_path))
                    remote_mtime = sftp.stat(file_path).st_mtime

                    if remote_mtime > mtime:
                        self.log.debug('downloading {}'.format(file_path))
                        sftp.get(file_path, local_path, preserve_mtime=True)

                        return True

                    self.log.info('SKIPPING: remote file is not newer')

                    return False
                else:
                    self.log.info('downloading {}'.format(file_path))
                    sftp.get(file_path, local_path, preserve_mtime=True)
