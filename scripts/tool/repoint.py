#!/usr/bin/env python
# * coding: utf8 *
'''
repoint.py
A module that updates pro project sources
'''

import glob
import os
import sys

import arcpy

print('this is not supported in arcgis pro as of version 2.3.3')

db = os.path.join(os.path.dirname(os.path.realpath(__file__)), '..', '..', 'maps')
local = os.path.join(db, 'DOCOffenders@(local).sde')
at = os.path.join(db, 'DOCOffenders@AT-viewer.sde')
prod = os.path.join(db, 'DOCOffenders@PROD-viewer.sde')

target = None

if len(sys.argv) > 1:
    target = sys.argv[1]

if not target:
    print('Local (L), AT (A), or Prod (P)? ')
    target = sys.stdin.readline()

target = target.upper()

if target == 'A':
    dest = at
elif target == 'P':
    dest = prod
else:
    dest = local

print('updating projects to use {}'.format(dest))

for project in glob.glob(os.path.join(db, '*.aprx')):
    print(project)

    aprx = arcpy.mp.ArcGISProject(project)

    aprx.updateConnectionProperties(local, dest)
    aprx.updateConnectionProperties(at, dest)
    aprx.updateConnectionProperties(prod, dest)

    aprx.save()

    del aprx

print('done')
