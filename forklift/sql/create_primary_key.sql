IF NOT EXISTS (
  SELECT *
  FROM   sys.columns
  WHERE  object_id = OBJECT_ID('[offenders]') AND name = 'id'
)
  ALTER TABLE [offenders] ADD [id] int NOT NULL IDENTITY (1,1)

  ALTER TABLE [offenders]
  ADD CONSTRAINT [PK_id] primary key(id);
