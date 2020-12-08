IF EXISTS(SELECT * FROM sys.indexes WHERE object_id = object_id('[DOCOAdmin].[offenders]') AND NAME ='IX_offender_shape')
    DROP INDEX [IX_offender_shape] ON [DOCOAdmin].[offenders];

IF EXISTS(SELECT * FROM sys.indexes WHERE object_id = object_id('[DOCOAdmin].[offenders]') AND NAME ='PK_id')
    ALTER TABLE [DOCOAdmin].[offenders]
    DROP CONSTRAINT [PK_id];

IF EXISTS(SELECT * FROM sys.indexes WHERE object_id = object_id('[DOCOAdmin].[offenders]') AND NAME ='IX_offender_offender_id')
    DROP INDEX [IX_offender_offender_id] ON [DOCOAdmin].[offenders];

IF EXISTS(SELECT * FROM sys.indexes WHERE object_id = object_id('[DOCOAdmin].[offenders]') AND NAME ='IX_offender_agent_id')
    DROP INDEX [IX_offender_agent_id] ON [DOCOAdmin].[offenders];

ALTER TABLE [DOCOAdmin].[offenders]
ADD CONSTRAINT [PK_id] primary key(id);

CREATE UNIQUE NONCLUSTERED INDEX [IX_offender_offender_id]
ON [DOCOAdmin].[offenders] ([offender_id] ASC)

CREATE NONCLUSTERED INDEX [IX_offender_agent_id]
ON [DOCOAdmin].[offenders] ([agent_id] ASC)

CREATE SPATIAL INDEX [IX_offender_shape]
ON [DOCOAdmin].[offenders]([shape])
