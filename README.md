# parole-and-probation

AP&amp;P web application

## Development

### Python

1. From python 3 create a virtual environment
   - `python -m venv .env`
1. Update pip
   - `python -m pip install -U pip`
1. Install python requirements
   - `pip install -r requriements.dev.txt`
1. Create hostkey
   - `ssh {sftp server}`
   - type `yes` to add the server to known hosts

## Deployment

### forklift

1. Install python requirements to forklift environment
   - `pip install -r requriements.txt`
1. Create hostkey
   - `ssh {sftp server}`
   - type `yes` to add the server to known hosts
1. Update secrets in the following files
   - Remove `.template` from `vault\database.template.py`
   - Remove `.template` from `vault\ftp.tempate.py`
