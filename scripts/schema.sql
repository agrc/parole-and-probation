CREATE TABLE offenders
(
    id int not null IDENTITY(1,1),
    offender_id integer,
    gender nchar(1),
    region_id smallint,
    agency nvarchar(30),
    supervisor_id nchar(8),
    supervisor_name nvarchar(35),
    agent_id nchar(8),
    agent_name nvarchar(40),
    offender nvarchar(60),
    dob datetime,
    race nvarchar(30),
    legal_type nvarchar(10),
    legal_class nchar(1),
    legal_status nvarchar(30),
    supervision_start_date datetime,
    offender_location nvarchar(40),
    address_start_date datetime,
    address nvarchar(50),
    unit nvarchar(15),
    city nvarchar(30),
    state nchar(2),
    zip nchar(5),
    address_type_code nchar(1),
    address_type nvarchar(20),
    x decimal(24,20),
    y decimal(24,20),
    score decimal(5,2),
    offender_phone nvarchar(25),
    standard_of_supervision nvarchar(5),
    special_supervision nvarchar(30),
    last_office_contact datetime,
    last_successful_field_contact datetime,
    last_field_contact datetime,
    field_contact_result nvarchar(15),
    offense_code nchar(1),
    offense_type nvarchar(30),
    crime_degree nchar(2),
    primary_offense nvarchar(80),
    earned_compliance_credit datetime,
    active_warrant bit,
    employer nvarchar(100),
    gang_id integer,
    gang_name nvarchar(30),
    gang_type_id integer,
    gang_type nvarchar(20)
)
