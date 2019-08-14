# parole-and-probation

[![Build Status](https://travis-ci.com/agrc/parole-and-probation.svg?branch=master)](https://travis-ci.com/agrc/parole-and-probation) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

AP&amp;P web application

## Development

_If you are using vscode, download the recommended extensions for this workspace._

### website

#### React

1. Change directories to the react App
   - `cd src/ClientApp`
1. Using node lts get all of the project dependencies
   - `npm install`
1. Duplicate `src/ClientApp/env.development` to `src/ClientApp/env.development.local` and add the correct values
1. Start the development server
   - `npm start`

_The offender feature service will not function since the reverse proxy dotnet service is not running._

### asp.net core mvc

1. Install the [dotnet core 2.2.* SDK](https://dotnet.microsoft.com/download/dotnet-core/2.2)
1. Copy the `ArcGIS` section in `src/appsettings.json` to `appsettings.Development.js` adding the correct values
1. Download a service account json file to log to stack driver and name it `src/log-writer-sa.json`
   - Update the `appsettings.json` if you will be logging to a different project than `agrc-admin`
1. Start the application
   - You can debug with the `Debug` vscode launch profile
   - `dotnet run`

### forklift

1. From python 3 create a virtual environment
   - `python -m venv .env`
1. Update pip
   - `python -m pip install -U pip`
1. Install python requirements
   - `pip install -r requirements.dev.txt`
1. Create hostkey
   - `ssh {sftp server}`
   - type `yes` to add the server to known hosts

## Deployment

### website

_This website uses standard version and conventional commits. The changelog and versions are managed by conventional commit messages and semantic versioning._

#### releases

1. Change directories to the react App
   - `cd src/ClientApp`
1. Create a release
   - `npm run release`
1. Create a prerelease
   - `npm run release -- --preprelease`
1. Push the version bump, changelog, and tag to GitHub
   - `git push --follow-tags origin master`

#### deploying

Rename and update `secrets.sample.json` to `secrets.json`

1. Add and set an `ASPNETCORE_ENVIRONMENT` environment variable on server to `Staging` or `Production`
1. Place the stack driver logging service account credentials on the deployment server
1. Add and set a `GOOGLE_APPLICATION_CREDENTIALS` environment variable with the path to the service account file
1. Publish to staging
   - `npm run deploy:stage`
   - `npm run deploy:prod`

### forklift

1. Install python requirements to forklift environment
   - `pip install -r requirements.txt`
1. Create a hostkey
   - `ssh {sftp server}`
   - type `yes` to add the server to known hosts
1. Update secrets in the following files
   - Remove `.template` from `vault\database.template.py`
   - Remove `.template` from `vault\ftp.template.py`
1. Create `corrections` database
1. Run [schema.sql](/scripts/schema.sql) to create the `offenders` table
