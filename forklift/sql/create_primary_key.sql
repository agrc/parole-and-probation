-- =============================================================
-- create_primary_key.sql
-- Purpose: Ensure `id` identity columns and primary key constraints
--          exist on `[offenders]` and `[agents]`.
-- What it does:
--  - For `[offenders]`: if `id` column is missing, adds an `int NOT NULL
--    IDENTITY(1,1)` column and creates `PK_offender_id` on `id`.
--  - For `[agents]`: same pattern; adds `id` identity and `PK_agent_id`.
-- Why: Many systems and ORMs expect a stable integer primary key for
--      joins, foreign keys, and incremental identity values.
-- Caveats:
--  - Adding an IDENTITY column modifies table metadata and may fail if
--    the table already has an incompatible primary key or constraints.
--  - This script guards against adding `id` twice by checking `sys.columns`.
-- =============================================================

IF NOT EXISTS (
  SELECT
    *
  FROM
    sys.columns
  WHERE
    object_id = OBJECT_ID('[offenders]')
    AND name = 'id'
)
ALTER TABLE
  [offenders]
ADD
  [id] int NOT NULL IDENTITY (1, 1)
ALTER TABLE
  [offenders]
ADD
  CONSTRAINT [PK_offender_id] primary key(id);

IF NOT EXISTS (
  SELECT
    *
  FROM
    sys.columns
  WHERE
    object_id = OBJECT_ID('[agents]')
    AND name = 'id'
)
ALTER TABLE
  [agents]
ADD
  [id] int NOT NULL IDENTITY (1, 1);
ALTER TABLE
  [agents]
ADD
  CONSTRAINT [PK_agent_id] primary key(id);
