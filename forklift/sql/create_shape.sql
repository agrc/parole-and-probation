UPDATE [offenders]
SET [offenders].[shape] = geometry::STGeomFromText('POINT(' + CONVERT(varchar, [offenders].[x]) + ' ' + CONVERT(varchar, [offenders].[y]) + ')', 3857)
