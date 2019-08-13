#!/usr/bin/env python
# * coding: utf8 *
'''
schema.py
A module that holds the schema for the dat file
'''

from collections import OrderedDict

import pandas as pd
from sqlalchemy.dialects.mssql import (BIT, CHAR, DATE, DECIMAL, INTEGER, SMALLINT, VARCHAR)


def convert_to_date(value):
    return pd.to_datetime(value, errors='coerce')


def convert_to_bool(value):
    if value.lower() == 'y' or value.lower == 't':
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


type_metadata = OrderedDict([
    ('offender_id', [INTEGER(), convert_to_str]),
    ('gender', [CHAR(1), convert_to_str]),
    ('region', [SMALLINT(), convert_to_int]),
    ('agency', [VARCHAR(30), convert_to_str]),
    ('supervisor_id', [VARCHAR(8), convert_to_str]),
    ('supervisor_name', [VARCHAR(35), convert_to_str]),
    ('agent_id_unused', [VARCHAR(8), convert_to_str]),
    ('agent_name', [VARCHAR(40), convert_to_str]),
    ('offender', [VARCHAR(60), convert_to_str]),
    ('date_of_birth', [DATE(), convert_to_date]),
    ('race', [VARCHAR(30), convert_to_str]),
    ('legal_status', [VARCHAR(10), convert_to_str]),
    ('legal_status_code', [CHAR(1), convert_to_str]),
    ('legal_status_description', [VARCHAR(30), convert_to_str]),
    ('supervision_start_date', [DATE(), convert_to_date]),
    ('offender_location', [VARCHAR(40), convert_to_str]),
    ('address_start_date', [DATE(), convert_to_date]),
    ('address', [VARCHAR(50), convert_to_str]),
    ('unit', [VARCHAR(15), convert_to_str]),
    ('city', [VARCHAR(30), convert_to_str]),
    ('state', [CHAR(2), convert_to_str]),
    ('zip', [SMALLINT(), convert_to_int]),
    ('address_type_code', [CHAR(1), convert_to_str]),
    ('address_type', [VARCHAR(20), convert_to_str]),
    ('x', [DECIMAL(24, 20), convert_to_float]),
    ('y', [DECIMAL(24, 20), convert_to_float]),
    ('score', [DECIMAL(5, 2), convert_to_float]),
    ('offender_phone', [VARCHAR(18), convert_to_str]),
    ('standard_of_supervision', [VARCHAR(5), convert_to_str]),
    ('special_supervision', [VARCHAR(30), convert_to_str]),
    ('last_office_contact', [INTEGER(), convert_to_int]),
    ('last_successful_field_contact', [INTEGER(), convert_to_int]),
    ('last_field_contact', [DATE(), convert_to_date]),
    ('field_contact_result', [VARCHAR(20), convert_to_str]),
    ('offense_code', [CHAR(1), convert_to_str]),
    ('primary_offense', [VARCHAR(30), convert_to_str]),
    ('crime_degree', [CHAR(2), convert_to_str]),
    ('offense_description', [VARCHAR(80), convert_to_str]),
    ('earned_compliance_credit', [DATE(), convert_to_date]),
    ('active_warrant', [BIT(), convert_to_bool]),
    ('gang_id', [INTEGER(), convert_to_int]),
    ('gang_name', [VARCHAR(30), convert_to_str]),
    ('gang_type_id', [INTEGER(), convert_to_int]),
    ('gang_type', [VARCHAR(20), convert_to_str]),
    ('agent_id', [INTEGER(), convert_to_str]),
    ('last_attempted_field_contact', [INTEGER(), convert_to_int]),
    ('in_compliance', [BIT(), convert_to_bool]),
    ('alerts', [VARCHAR(500), convert_to_str]),
    ('cautions', [VARCHAR(3500), convert_to_str]),
    ('employer', [VARCHAR(30), convert_to_str]),
    ('employer_address', [VARCHAR(60), convert_to_str]),
    ('employer_phone', [VARCHAR(12), convert_to_str]),
])

FIELDS = list(type_metadata.keys())
FIELDS.append('empty')

CONVERTERS = {header: value[1] for (header, value) in type_metadata.items()}

TYPES = {header: value[0] for (header, value) in type_metadata.items()}
