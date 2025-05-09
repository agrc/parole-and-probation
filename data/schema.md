Name |Type |Description
--- | --- | ---
ofndr_num |                   integer|Unique UDC offender identifyer|
[gender](https://github.com/agrc/parole-and-probation/wiki/Lookup-Data#gender) | char(1)|Offender gender|
[region_id](https://github.com/agrc/parole-and-probation/wiki/Lookup-Data#region) | smallint|ID of AP&P Region (1,3,4,5,6 or blank)|
agcy_desc |                   varchar(30)|Description of AP&P Agency|
supervisor_id |                char(8)|ID of Agent's Supervisor|
supervisor_name|               varchar(35)|Name of Agents Supervisor|
agnt_id  |                     char(8)|ID of offender's agent|
agent_name |                   varchar(35)|Name of offender's agent|
ofndr_full_name |              varchar(60)|Offender's default full name|
dob  |                         datetime year to day|Offender's default date-of-birth (yyyy-mm-dd)|
race  |                        varchar(30)|Offender's race - Description|
legal_stat_type    |           varchar(10)|Offender's Legal Status type (PROBATION or PAROLE)|
legal_stat_cd  |               char(1)|Code value of Offender's Legal Status|
[legal_status](https://github.com/agrc/parole-and-probation/wiki/Lookup-Data#legal-status) | varchar(30)|Offender's Legal Status - Description|
supervision_start_date |       datetime year to day|Date offender started current supervision period|
ofndr_location |               varchar(40)|Offender's current Location - Description|
address_start_date |           datetime year to day|Date offender started this address - (yyyy-mm-dd)|
address|                       varchar(50)|Offender's address (most likely 1st Physical)|
unit |                         varchar(15)|Address Unit (APT, TRLR, ROOM, UNIT, BLDG . . . etc.)|
city  |                        varchar(30)|Address City|
st   |                         char(2)|Address State|
zip   |                        char(5)|Address Zip Code|
addr_typ_cd |                  char(1)|Address Type - Code|
addr_typ_desc |                varchar(20)|Address Type - Description (1st PHYSICAL, 2nd PHYSICAL, MAILING, HISTORICAL . . . etc.)|
x   |                          decimal(24,20)|Geocoded x Coordinate|
y   |                          decimal(24,20)|Geocoded y Coordinate|
score   |                      decimal(5,2)|AGRC Geocode Confidence Score|
ofndr_phone  |                 varchar(25)|Offender's Phone Number - as Type: Area Code-Prefix-Number - e.g. CELL: 801-555-5529|
[std_of_sprvsn](https://github.com/agrc/parole-and-probation/wiki/Lookup-Data#standard-of-supervision)|  varchar(5)|Offender's Standard of Supervision (risk level) - Description (LOW, MOD, HI, INT)|
[spcl_sprvsn](https://github.com/agrc/parole-and-probation/wiki/Lookup-Data#special-supervision) | varchar(30)|Offender's Special Supervision - Description (may be multiple separated by comma)|
last_office_cntc_days  |         integer|Days since Offender's last Office visit with Agent|
last_successful_field_cntc_days |integer|Days since Offender's last successful Field visit with agent|
last_field_cntc_dt|            datetime year to day|Offender's last Field contact with agent - (yyyy-mm-dd)|
field_cntc_rslt  |             varchar(20)|Result of last field contact with offender - Description (ATTEMPTED, SUCCESSFUL)|
[ofnse_typ_cd](https://github.com/agrc/parole-and-probation/wiki/Lookup-Data#offense-type) | char(1)|Offense Type code - primary offense|
ofnse_typ_desc  |              varchar(30)|Offense Type Description - primary offense|
crime_degree_cd  |             char(2)|Offense Crime Degree code - primary offense - (FC, F1, F2, F3, S, MA, SM, MB, MC, IN)|
ofnse_desc   |                 varchar(80)|Offense Description - primary offense|
ecc |                          datetime year to day|Earned Compliance Credit (yyyy-mm-dd)|
[active_warrant](https://github.com/agrc/parole-and-probation/wiki/Lookup-Data#active-warrant)| char(1)|Does the offender have active warrants (Y, N)|
[stg_id](https://github.com/agrc/parole-and-probation/wiki/Lookup-Data#stg) | integer|Security Threat Group (Gang) - Identifier|
stg_name  |                    varchar(30)|Security Threat Group (Gang) Name|
[stg_typ_id](https://github.com/agrc/parole-and-probation/wiki/Lookup-Data#stg-type) | integer|Security Threat Group (Gang) Type Identifier|
stg_typ   |                    varchar(20)|Security Threat Group (Gang) - Type Desciption|
agnt_emp_id | integer | Agent's employee I.D. number|
last_atmptd_field_cntc_days | integer | Days since Offender's last Attempted Field visit with agent|
compliance_flag | boolean (t/f) | Standard of Supervision and Field Contact Compliance (t = compliant)|
ofndr_alerts | varchar (500) | Current offender alerts concatenated as one csv string|
ofndr_cautions | varchar (3500) | Current offender cautions concatenated as one csv string|
emp_name | varchar (30) | Offender's employee name|
emp_address | varchar (60) | Offender's employer address (addr, city zip st)|
emp_phone | char (12) | Offender's employer phone (999-999-9999)|
