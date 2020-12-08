IF NOT EXISTS (
  SELECT *
  FROM   sys.columns
  WHERE  object_id = OBJECT_ID('[offenders]') AND name = 'id'
)
  ALTER TABLE [offenders] ADD [id] int NOT NULL IDENTITY (1,1)
  GO

  ALTER TABLE [DOCOAdmin].[offenders]
  ADD CONSTRAINT [PK_id] primary key(id);
