-- =============================================================
-- create_indexes.sql
-- Purpose: Drop old indexes (if present) and create required indexes
--          for `[offenders]`, including nonclustered and a spatial index.
-- What it does (high level):
--  - Drops existing index objects that would conflict with recreation.
--  - Creates a unique index on `offender_id`, a non-unique index on
--    `agent_id`, and a spatial index on `shape`.
-- Why: Indexes speed lookups, joins, and spatial queries; dropping
--      before creating avoids "already exists" errors.
-- Caveats:
--  - Do not create the primary key here; primary-key creation is handled
--    by `create_primary_key.sql` to avoid duplicate-PK conflicts.
--  - Ensure `shape` is populated and has the correct SRID before
--    creating the spatial index. Large index operations can be costly.
-- =============================================================

IF EXISTS(
    SELECT
        *
    FROM
        sys.indexes
    WHERE
        object_id = object_id('[offenders]')
        AND NAME = 'IX_offender_shape'
) DROP INDEX [IX_offender_shape] ON [offenders];

IF EXISTS(
    SELECT
        *
    FROM
        sys.indexes
    WHERE
        object_id = object_id('[offenders]')
        AND NAME = 'PK_id'
)

IF EXISTS(
    SELECT
        *
    FROM
        sys.indexes
    WHERE
        object_id = object_id('[offenders]')
        AND NAME = 'IX_offender_offender_id'
) DROP INDEX [IX_offender_offender_id] ON [offenders];

IF EXISTS(
    SELECT
        *
    FROM
        sys.indexes
    WHERE
        object_id = object_id('[offenders]')
        AND NAME = 'IX_offender_agent_id'
) DROP INDEX [IX_offender_agent_id] ON [offenders];

CREATE UNIQUE NONCLUSTERED INDEX [IX_offender_offender_id] ON [offenders] ([offender_id] ASC)

CREATE NONCLUSTERED INDEX [IX_offender_agent_id] ON [offenders] ([agent_id] ASC)

CREATE SPATIAL INDEX [IX_offender_shape] ON [offenders] ([shape]) USING GEOMETRY_AUTO_GRID WITH (
    BOUNDING_BOX =(-12800000, 4400000, -12100000, 5200000),
    CELLS_PER_OBJECT = 16,
    PAD_INDEX = OFF,
    STATISTICS_NORECOMPUTE = OFF,
    SORT_IN_TEMPDB = OFF,
    DROP_EXISTING = OFF,
    ONLINE = OFF,
    ALLOW_ROW_LOCKS = ON,
    ALLOW_PAGE_LOCKS = ON
)
