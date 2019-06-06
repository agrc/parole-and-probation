# parole-and-probation

[![Build Status](https://travis-ci.com/agrc/parole-and-probation.svg?branch=master)](https://travis-ci.com/agrc/parole-and-probation) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

AP&amp;P web application

## Development

### website

1. Using node lts get all of the project dependencies
   - `npm install`
1. Start a server
   - `npm start`

### forklift

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

### website

_This website uses standard version and conventional commits. The changelog and versions are managed by conventional commit messages and semantic versioning._

#### releases

1. Create a release
   - `npm run release`
1. Create a prerelease
   - `npm run release -- --preprelease`
1. Push the version bump, changelog, and tag to GitHub
   - `git push --follow-tags origin masger`

#### deploying

Rename and update `secrets.sample.json` to `secrets.json`

1. Publish to staging
   - `npm run stage`

### forklift

1. Install python requirements to forklift environment
   - `pip install -r requriements.txt`
1. Create hostkey
   - `ssh {sftp server}`
   - type `yes` to add the server to known hosts
1. Update secrets in the following files
   - Remove `.template` from `vault\database.template.py`
   - Remove `.template` from `vault\ftp.tempate.py`
1. Create `corrections` database
1. Run [schema.sql](/scripts/schema.sql) to create the `offenders` table
