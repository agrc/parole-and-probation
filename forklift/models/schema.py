#!/usr/bin/env python
# * coding: utf8 *
'''
schema.py
A module that holds the schema for the dat file
'''

import pandas as pd
from sqlalchemy.dialects.mssql import BIT, CHAR, DATE, DECIMAL, INTEGER, SMALLINT, VARCHAR


def convert_to_date(value):
    return pd.to_datetime(value, errors='coerce')


def convert_to_bool(value):
    if value.lower() == 'y':
        return 1

    return 0


def convert_to_float(value):
    return convert_to(float, value)


def convert_to_int(value):
    try:
        value = convert_to(int, value)
    except Exception:
        return None


def convert_to_str(value):
    return convert_to(str, value)


def convert_to(cast, value):
    value = value.strip()
    if value.strip() == '':
        return None

    return cast(value)


FIELDS = [
    'offender_id',
    'gender',
    'region',
    'agency',
    'supervisor_id',
    'supervisor_name',
    'agent_id',
    'agent_name',
    'offender',
    'date_of_birth',
    'race',
    'legal_status',
    'legal_status_code',
    'legal_status_description',
    'supervision_start_date',
    'offender_location',
    'address_start_date',
    'address',
    'unit',
    'city',
    'state',
    'zip',
    'address_type_code',
    'address_type',
    'x',
    'y',
    'score',
    'offender_phone',
    'standard_of_supervision',
    'special_supervision',
    'last_office_contact',
    'last_successful_field_contact',
    'last_field_contact',
    'field_contact_result',
    'offense_code',
    'primary_offense',
    'crime_degree',
    'offense_description',
    'earned_compliance_credit',
    'active_warrant',
    'employer',
    'gang_id',
    'gang_name',
    'gang_type_id',
    'gang_type',
    'empty',
]

CONVERTERS = {
    'gender': convert_to_str,
    'region': convert_to_int,
    'agency': convert_to_str,
    'supervisor_id': convert_to_str,
    'supervisor_name': convert_to_str,
    'agent_id': convert_to_str,
    'agent_name': convert_to_str,
    'offender': convert_to_str,
    'date_of_birth': convert_to_date,
    'race': convert_to_str,
    'legal_status': convert_to_str,
    'legal_status_code': convert_to_str,
    'legal_status_description': convert_to_str,
    'supervision_start_date': convert_to_date,
    'offender_location': convert_to_str,
    'address_start_date': convert_to_date,
    'address': convert_to_str,
    'unit': convert_to_str,
    'city': convert_to_str,
    'state': convert_to_str,
    'zip': convert_to_int,
    'address_type_code': convert_to_str,
    'address_type': convert_to_str,
    'x': convert_to_float,
    'y': convert_to_float,
    'score': convert_to_float,
    'offender_phone': convert_to_str,
    'standard_of_supervision': convert_to_str,
    'special_supervision': convert_to_str,
    'last_office_contact': convert_to_date,
    'last_successful_field_contact': convert_to_date,
    'last_field_contact': convert_to_date,
    'field_contact_result': convert_to_str,
    'offense_code': convert_to_str,
    'primary_offense': convert_to_str,
    'crime_degree': convert_to_str,
    'offense_description': convert_to_str,
    'earned_compliance_credit': convert_to_date,
    'active_warrant': convert_to_bool,
    'employer': convert_to_str,
    'gang_id': convert_to_int,
    'gang_name': convert_to_str,
    'gang_type_id': convert_to_int,
    'gang_type': convert_to_str,
}

TYPES = {
    'offender_id': INTEGER(),
    'gender': CHAR(),
    'region': SMALLINT(),
    'agency': VARCHAR(30),
    'supervisor_id': VARCHAR(8),
    'supervisor_name': VARCHAR(35),
    'agent_id': VARCHAR(8),
    'agent_name': VARCHAR(35),
    'offender': VARCHAR(60),
    'date_of_birth': DATE(),
    'race': VARCHAR(30),
    'legal_status': VARCHAR(10),
    'legal_status_code': CHAR(),
    'legal_status_description': VARCHAR(30),
    'supervision_start_date': DATE(),
    'offender_location': VARCHAR(40),
    'address_start_date': DATE(),
    'address': VARCHAR(50),
    'unit': VARCHAR(15),
    'city': VARCHAR(30),
    'state': CHAR(2),
    'zip': SMALLINT(),
    'address_type_code': CHAR(),
    'address_type': VARCHAR(20),
    'x': DECIMAL(15, 12),
    'y': DECIMAL(15, 12),
    'score': DECIMAL(5, 2),
    'offender_phone': VARCHAR(25),
    'standard_of_supervision': VARCHAR(5),
    'special_supervision': VARCHAR(30),
    'last_office_contact': DATE(),
    'last_successful_field_contact': DATE(),
    'last_field_contact': DATE(),
    'field_contact_result': VARCHAR(20),
    'offense_code': CHAR(),
    'primary_offense': VARCHAR(30),
    'crime_degree': CHAR(2),
    'offense_description': VARCHAR(80),
    'earned_compliance_credit': DATE(),
    'active_warrant': BIT(),
    'employer': VARCHAR(100),
    'gang_id': INTEGER(),
    'gang_name': VARCHAR(30),
    'gang_type_id': INTEGER(),
    'gang_type': VARCHAR(20)
}
