#!/usr/bin/env python
# * coding: utf8 *
"""
schema.py
A module that holds the schema for the dat file
"""

from collections import OrderedDict

from sqlalchemy.dialects.mssql import BIT, CHAR, DATE, DECIMAL, INTEGER, SMALLINT, VARCHAR

type_metadata = OrderedDict([
    ('legal_status_code', [CHAR(1), 'string']),
    ('crime_degree', [CHAR(2), 'string']),
    ('gender', [CHAR(1), 'string']),
    ('agent_name', [VARCHAR(40), 'string']),
    ('agent_id', [INTEGER(), 'Int32']),
    ('date_of_birth', [DATE(), 'datetime64[ns]']),
    ('supervisor_id', [VARCHAR(8), 'string']),
    ('supervisor_name', [VARCHAR(35), 'string']),
    ('offender', [VARCHAR(60), 'string']),
    ('active_warrant', [BIT(), 'Int8']),
    ('legal_status', [VARCHAR(10), 'string']),
    ('last_successful_field_contact', [INTEGER(), 'Int32']),
    ('supervision_start_date', [DATE(), 'datetime64[ns]']),
    ('offense_description', [VARCHAR(80), 'string']),
    ('agency', [VARCHAR(30), 'string']),
    ('race', [VARCHAR(30), 'string']),
    ('special_supervision', [VARCHAR(30), 'string']),
    ('last_attempted_field_contact', [INTEGER(), 'Int32']),
    ('in_compliance', [BIT(), 'Int8']),
    ('last_office_contact', [INTEGER(), 'Int32']),
    ('offense_code', [CHAR(1), 'string']),
    ('primary_offense', [VARCHAR(30), 'string']),
    ('region', [SMALLINT(), 'Int8']),
    ('offender_location', [VARCHAR(40), 'string']),
    ('offender_id', [INTEGER(), 'Int32']),
    ('legal_status_description', [VARCHAR(30), 'string']),
    ('earned_compliance_credit', [DATE(), 'datetime64[ns]']),
    ('city', [VARCHAR(30), 'string']),
    ('county', [VARCHAR(12), 'string']),
    ('score', [DECIMAL(5, 2), 'Int16']),
    ('address_start_date', [DATE(), 'string']),
    ('zip', [INTEGER(), 'Int']),
    ('state', [CHAR(2), 'string']),
    ('address', [VARCHAR(50), 'string']),
    ('cautions', [VARCHAR(3500), 'string']),
    ('address_type', [VARCHAR(20), 'string']),
    ('x', [DECIMAL(24, 20), 'Int32']),
    ('y', [DECIMAL(24, 20), 'Int32']),
    ('address_type_code', [CHAR(1), 'string']),
    ('last_field_contact', [DATE(), 'datetime64[ns]']),
    ('field_contact_result', [VARCHAR(20), 'string']),
    ('alerts', [VARCHAR(500), 'string']),
    ('unit', [VARCHAR(30), 'string']),
    ('standard_of_supervision', [VARCHAR(5), 'string']),
    ('employer', [VARCHAR(30), 'string']),
    ('employer_phone', [VARCHAR(12), 'string']),
    ('employer_address', [VARCHAR(60), 'string']),
    ('offender_phone', [VARCHAR(18), 'string']),
    ('gang_name', [VARCHAR(30), 'string']),
    ('gang_type', [VARCHAR(20), 'string']),
    ('gang_id', [INTEGER(), 'Int32']),
    ('gang_type_id', [INTEGER(), 'Int32']),
])

DATA_TYPES = {header: value[1] for (header, value) in type_metadata.items()}
SQL_TYPES = {header: value[0] for (header, value) in type_metadata.items()}

SPECIAL_SUPERVISION = [
    'CCC',
    'COMP',
    'DEP',
    'DORA',
    'DRUG CT',
    'ECR',
    'EM',
    'FOSI',
    'FUG',
    'GPS',
    'IG INT',
    'INCAR',
    'MIO',
    'PVP',
    'RESID',
    'SO',
    'SO-A',
    'SO-B',
    'SO-C',
]

AGENT_SQL_TYPES = {
    'id': INTEGER(),
    'value': VARCHAR(128),
    'agent_id': VARCHAR(64),
    'supervisor_id': VARCHAR(64),
    'supervisor_name': VARCHAR(128),
}
