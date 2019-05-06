#!/usr/bin/env python
# * coding: utf8 *
'''
sqlwriter.py
A module that write to a sql db
'''

import pyodbc as odbc
from models import schema
from vault import database

batch_size = 10000
insert_statements = {'offenders': 'INSERT INTO offenders VALUES ({}'.format('?, ' * len(schema.SCHEMA))[:-2] + ')'}


def insert_rows(table_name, rows, log):
    if table_name.lower() not in list(insert_statements.keys()):
        raise Exception(table_name, 'Do not know how to insert this type of record')

    connection = odbc.connect(database.CONNECTION)
    cursor = connection.cursor()

    command = insert_statements[table_name.lower()]
    i = 1
    for row in rows:
        try:
            cursor.execute(command, row)
            i += 1

            #: commit commands to database
            if i % batch_size == 0:
                cursor.commit()
        except Exception as e:
            log.debug(row)
            cursor.close()
            connection.close()

            raise e

    try:
        cursor.commit()
    except odbc.ProgrammingError as e:
        log.fatal(e)
        #: connection is closed. error
        pass


def truncate(table_name, log):
    connection = odbc.connect(database.CONNECTION)
    cursor = connection.cursor()

    command = 'TRUNCATE TABLE {}'.format(table_name)
    cursor.execute(command)

    try:
        cursor.commit()
    except odbc.ProgrammingError as e:
        log.debug(command)
        log.fatal(e)
        #: connection is closed. error
        raise e

    connection.close()
