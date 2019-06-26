#!/usr/bin/env python
# * coding: utf8 *
'''
propublish.py
A module that publishes a new service with propy
'''

import os

import arcpy
import vault

# Set output file names
server = vault.ARCGIS['url']
ags_file = vault.ARCGIS['ags_file_path']
outdir = r'C:\temp'
service = 'Offenders'
folder = 'DOC'
pro_project = os.path.join(os.path.dirname(os.path.realpath(__file__)), '..', '..', 'maps', 'DOC.aprx')
map_name = 'FieldMap'
sddraft_filename = service + '.sddraft'
sddraft_output_filename = os.path.join(outdir, sddraft_filename)

# Reference map to publish
print('finding project')
aprx = arcpy.mp.ArcGISProject(pro_project)

print('finding map')
m = aprx.listMaps(map_name)[0]

# Create MapServiceDraft and set service properties
print('creating sddraft file')
service_draft = arcpy.sharing.CreateSharingDraft(server_type='STANDALONE_SERVER', service_type='MAP_SERVICE', service_name=service, draft_value=m)

service_draft.targetServer = ags_file
service_draft.serverFolder = folder

# Create Service Definition Draft file
print('creating sd file')
service_draft.exportToSDDraft(sddraft_output_filename)

# Stage Service
sd_filename = service + '.sd'
sd_output_filename = os.path.join(outdir, sd_filename)

print('staging service')
arcpy.server.StageService(sddraft_output_filename, sd_output_filename)

# Share to portal
print('Uploading Service Definition...')
arcpy.server.UploadServiceDefinition(sd_output_filename, server)

print('Successfully Uploaded service.')
