#!/usr/bin/env python
# * coding: utf8 *
'''
caster.py
A module that casts strings to objects
'''
import datetime
from dateutil.parser import parse


def cast(value, new_type):
    if value is None:
        return None

    try:
        value = value.strip()
    except Exception:
        pass

    def noop(x):
        return x

    def cast_bit(value):
        if value.lower() == 'y':
            return 1
        return 0

    def parse_date(value):
        date = parse(value)

        if date <= datetime.datetime(1753, 1, 1):
            print('date is equivalent to null')
            return None

    def is_boolean_value(x):
        return x.lower() in ('yes', 'true', 't', '1')

    if new_type == 'string':
        cast = str
    elif new_type == 'int':
        cast = int
    elif (new_type == 'float' or new_type == 'double'):
        cast = float
    elif new_type == 'date':
        if isinstance(value, datetime.datetime):
            cast = noop
        elif value == '':
            return None
        else:
            cast = parse_date
    elif new_type == 'bool':
        cast = is_boolean_value
    elif new_type == 'bit':
        cast = cast_bit
    else:
        raise Exception(new_type, 'No casting method created.')

    try:
        value = cast(value)

        if value == '':
            return None

        return value
    except Exception:
        return None
