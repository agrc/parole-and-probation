IF NOT EXISTS (
  SELECT *
  FROM sys.columns
  WHERE object_id = OBJECT_ID('[offenders]') AND name = 'shape'
)
  ALTER TABLE [offenders] ADD [shape] geometry
