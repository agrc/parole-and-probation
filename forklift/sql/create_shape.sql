UPDATE [offenders]
SET [offenders].[shape] = geography::STGeomFromText('POINT(' + CONVERT(varchar, [offenders].[x]) + ' ' + CONVERT(varchar, [offenders].[y]) + ')', 4326)
