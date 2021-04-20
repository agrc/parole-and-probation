UPDATE
  [offenders]
SET
  [offenders].[shape] = geometry :: STGeomFromText(
    'POINT(' + CONVERT(varchar, [offenders].[web_x]) + ' ' + CONVERT(varchar, [offenders].[web_y]) + ')',
    3857
  )
