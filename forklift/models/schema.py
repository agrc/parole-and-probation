#!/usr/bin/env python
# * coding: utf8 *
'''
schema.py
A module that holds the schema for the dat file
'''

import pandas as pd


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


def to_field_order(d, shape):
    return [
        shape,
        d['offender_id'],
        d['gender'],
        d['region'],
        d['agency'],
        d['supervisor_id'],
        d['supervisor_name'],
        d['agent_id'],
        d['agent_name'],
        d['offender'],
        d['date_of_birth'],
        d['race'],
        d['legal_status'],
        d['legal_status_code'],
        d['legal_status_description'],
        d['supervision_start_date'],
        d['offender_location'],
        d['address_start_date'],
        d['address'],
        d['unit'],
        d['city'],
        d['state'],
        d['zip'],
        d['address_type_code'],
        d['address_type'],
        d['x'],
        d['y'],
        d['score'],
        d['offender_phone'],
        d['standard_of_supervision'],
        d['special_supervision'],
        d['last_office_contact'],
        d['last_successful_field_contact'],
        d['last_field_contact'],
        d['field_contact_result'],
        d['offense_code'],
        d['primary_offense'],
        d['crime_degree'],
        d['offense_description'],
        d['earned_compliance_credit'],
        d['active_warrant'],
        d['employer'],
        d['gang_id'],
        d['gang_name'],
        d['gang_type_id'],
        d['gang_type'],
    ]


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

SCHEMA = {
    'ofndr_num': {
        'type': 'int',
        'map': 'offender_id'
    },
    'gender': {
        'type': 'string',
        'map': 'gender'
    },
    'region_id': {
        'type': 'int',
        'map': 'region'
    },
    'agcy_desc': {
        'type': 'string',
        'map': 'agency'
    },
    'supervisor_id': {
        'type': 'string',
        'map': 'supervisor_id'
    },
    'supervisor_name': {
        'type': 'string',
        'map': 'supervisor_name'
    },
    'agnt_id': {
        'type': 'string',
        'map': 'agent_id'
    },
    'agent_name': {
        'type': 'string',
        'map': 'agent_name'
    },
    'ofndr_full_name': {
        'type': 'string',
        'map': 'offender'
    },
    'dob': {
        'type': 'date',
        'map': 'date_of_birth'
    },
    'race': {
        'type': 'string',
        'map': 'race'
    },
    'legal_stat_type': {
        'type': 'string',
        'map': 'legal_status'
    },
    'legal_stat_cd': {
        'type': 'string',
        'map': 'legal_status_code'
    },
    'legal_status': {
        'type': 'string',
        'map': 'legal_status_description'
    },
    'supervision_start_date': {
        'type': 'date',
        'map': 'supervision_start_date'
    },
    'ofndr_location': {
        'type': 'string',
        'map': 'offender_location'
    },
    'address_start_date': {
        'type': 'date',
        'map': 'address_start_date'
    },
    'address': {
        'type': 'string',
        'map': 'address'
    },
    'unit': {
        'type': 'string',
        'map': 'unit'
    },
    'city': {
        'type': 'string',
        'map': 'city'
    },
    'st': {
        'type': 'string',
        'map': 'state'
    },
    'zip': {
        'type': 'string',
        'map': 'zip'
    },
    'addr_typ_cd': {
        'type': 'string',
        'map': 'address_type_code'
    },
    'addr_typ_desc': {
        'type': 'string',
        'map': 'address_type'
    },
    'x': {
        'type': 'float',
        'map': 'x'
    },
    'y': {
        'type': 'float',
        'map': 'y'
    },
    'score': {
        'type': 'float',
        'map': 'score'
    },
    'ofndr_phone': {
        'type': 'string',
        'map': 'offender_phone'
    },
    'std_of_sprvsn': {
        'type': 'string',
        'map': 'standard_of_supervision'
    },
    'spcl_sprvsn': {
        'type': 'string',
        'map': 'special_supervision'
    },
    'last_office_cntc_dt': {
        'type': 'date',
        'map': 'last_office_contact'
    },
    'last_successful_field_cntc_dt': {
        'type': 'date',
        'map': 'last_successful_field_contact'
    },
    'last_field_cntc_dt': {
        'type': 'date',
        'map': 'last_field_contact'
    },
    'field_cntc_rslt': {
        'type': 'string',
        'map': 'field_contact_result'
    },
    'ofnse_typ_cd': {
        'type': 'string',
        'map': 'offense_code'
    },
    'ofnse_typ_desc': {
        'type': 'string',
        'map': 'primary_offense'
    },
    'crime_degree_cd': {
        'type': 'string',
        'map': 'crime_degree'
    },
    'ofnse_desc': {
        'type': 'string',
        'map': 'offense_description'
    },
    'ecc': {
        'type': 'date',
        'map': 'earned_compliance_credit'
    },
    'active_warrant': {
        'type': 'bit',
        'map': 'active_warrant'
    },
    'employer': {
        'type': 'string',
        'map': 'employer'
    },
    'stg_id': {
        'type': 'int',
        'map': 'gang_id'
    },
    'stg_name': {
        'type': 'string',
        'map': 'gang_name'
    },
    'stg_typ_id': {
        'type': 'int',
        'map': 'gang_type_id'
    },
    'stg_typ': {
        'type': 'string',
        'map': 'gang_type'
    }
}
