#!/usr/bin/env python
# * coding: utf8 *
'''
pallet.py
A module that handles the forklifting for the project
'''

import os

import csv
import pysftp

from forklift.models import Pallet
from vault import ftp
from models import schema
from services import caster, sqlwriter


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

            self.dirty = True

            return True

        #: get mtime from current file
        last_modified = os.stat(data).st_mtime

        #: connect to sftp
        #: check mtime on remote file
        #: replace if newer
        self.dirty = self.get_files(mtime=last_modified)

        return self.dirty

    def process(self):
        data = []
        dat_file = os.path.join(self.corrections, self.data)
        stats = os.stat(dat_file)

        try:
            self.log.info('reading dat file')
            with open(dat_file, 'r', newline='') as dat:
                dat_reader = csv.reader(dat, delimiter='|', quoting=csv.QUOTE_NONE)
                for row in dat_reader:
                    data.append([caster.cast(field, schema.SCHEMA[index][1]) for index, field in enumerate(row) if index < len(schema.SCHEMA)])

            #: truncate database
            self.log.info('truncating table')
            sqlwriter.truncate('offenders', self.log)

            #: load new data
            self.log.info('writing rows')
            sqlwriter.insert_rows('offenders', data, self.log)
        except Exception as e:
            self.log.fatal(e)
            self.success = (False, 'unable to read and write data to sql')
        finally:
            with open(dat_file, 'w') as dat:
                dat.truncate()
                #: opening for writing truncates file
                pass

            os.utime(dat_file, (stats.st_atime, stats.st_mtime))

    def is_dat(self, file_path):
        return os.path.basename(file_path).lower() == self.data

    def remove(self, file_path):
        if os.path.exists(file_path):
            os.remove(file_path)

    def get_files(self, mtime=0):
        with pysftp.Connection(**ftp.CREDENTIALS) as sftp:
            sftp.chdir('/upload')
            items = sftp.listdir()

            self.log.info('found {}'.format(','.join(items)))

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
                        self.log.info('downloading {}'.format(file_path))
                        sftp.get(file_path, local_path, preserve_mtime=True)

                        return True

                    self.log.info('remote file is not newer')

                    return False
                else:
                    self.log.info('downloading {}'.format(file_path))
                    sftp.get(file_path, local_path, preserve_mtime=True)
