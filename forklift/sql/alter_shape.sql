-- =============================================================
-- alter_shape.sql
-- Purpose: Ensure the `shape` column exists on the [offenders] table.
-- What it does:
--  - Checks `sys.columns` for a column named `shape` on `[offenders]`.
--  - If not present, adds `shape` of type `geometry`.
-- Why: A `geometry` column is required to store spatial points
--      and to build a spatial index on geographic locations.
-- Caveats:
--  - Adding a column can cause metadata locks on large tables.
--  - The `geometry` SRID is not set here; populating scripts must
--    ensure consistent coordinate system.
-- =============================================================

IF NOT EXISTS (
  SELECT
    *
  FROM
    sys.columns
  WHERE
    object_id = OBJECT_ID('[offenders]')
    AND name = 'shape'
)
ALTER TABLE
  [offenders]
ADD
  [shape] geometry
