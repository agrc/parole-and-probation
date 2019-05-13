#!/usr/bin/env python
# * coding: utf8 *
'''
database.py
A module that holds the secrets for the database
'''

#: odbc 17 driver: https://www.microsoft.com/en-us/download/details.aspx?id=56567
CONNECTION = 'mssql+pyodbc://(local)/corrections?driver=ODBC+Driver+17+for+SQL+Server'
