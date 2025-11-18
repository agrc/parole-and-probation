-- =============================================================
-- create_shape.sql
-- Purpose: Populate the `shape` geometry column on `[offenders]`
-- What it does:
--  - For each row, builds a WKT POINT from `web_x` and `web_y` and
--    converts it into a `geometry` instance using SRID 3857 (Web Mercator).
-- Why: Converting numeric coordinates into `geometry` objects enables
--      spatial queries and creation of spatial indexes.
-- Caveats:
--  - `web_x`/`web_y` must be numeric and in the same coordinate
--    system as the SRID (3857). Otherwise spatial queries will be wrong.
--  - Rows with NULL/invalid coordinates will get NULL shapes.
-- =============================================================

UPDATE
  [offenders]
SET
  [offenders].[shape] = geometry :: STGeomFromText(
    'POINT(' + CONVERT(varchar, [offenders].[web_x]) + ' ' + CONVERT(varchar, [offenders].[web_y]) + ')',
    3857
  )
