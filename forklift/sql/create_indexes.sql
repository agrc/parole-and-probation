IF EXISTS(SELECT * FROM sys.indexes WHERE object_id = object_id('[offenders]') AND NAME ='IX_offender_shape')
    DROP INDEX [IX_offender_shape] ON [offenders];

IF EXISTS(SELECT * FROM sys.indexes WHERE object_id = object_id('[offenders]') AND NAME ='PK_id')
    ALTER TABLE [offenders]
    DROP CONSTRAINT [PK_id];

IF EXISTS(SELECT * FROM sys.indexes WHERE object_id = object_id('[offenders]') AND NAME ='IX_offender_offender_id')
    DROP INDEX [IX_offender_offender_id] ON [offenders];

IF EXISTS(SELECT * FROM sys.indexes WHERE object_id = object_id('[offenders]') AND NAME ='IX_offender_agent_id')
    DROP INDEX [IX_offender_agent_id] ON [offenders];

ALTER TABLE [offenders]
ADD CONSTRAINT [PK_id] primary key(id);

CREATE UNIQUE NONCLUSTERED INDEX [IX_offender_offender_id]
ON [offenders] ([offender_id] ASC)

CREATE NONCLUSTERED INDEX [IX_offender_agent_id]
ON [offenders] ([agent_id] ASC)

CREATE SPATIAL INDEX [IX_offender_shape]
ON [offenders]([shape])
