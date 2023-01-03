# parole-and-probation

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

AP&amp;P web application

## Development

_If you are using vscode, download the recommended extensions from this workspace._

### website

#### React

1. Change directories to the react App
   - `cd src/ClientApp`
1. Using node lts get all of the project dependencies
   - `npm install`
1. Rename `src/ClientApp/.env-cmdrc.template.json` to `src/ClientApp/.env-cmdrc.json` and add the correct values
1. Start the development server
   - `npm start`

_The offender feature service will not function since the reverse proxy dotnet service is not running._

### asp.net core mvc

1. Install the [dotnet 7.0.\* SDK](https://dotnet.microsoft.com/download/dotnet/7.0)
1. Create an `appsettings.Development.json` file to overwrite and add properties to the `appsettings.json` file for development
1. Add an `ArcGIS` property in `appsettings.Development.json` with the following properties filled out

   ```json
   "ArcGIS": {
     "username": "",
     "password": "",
     "host": "dns.of.arcgis"
   },
   ```

1. Add a `ReverseProxy` property in `appsettings.Development.json` with the address of the arcgis map service

   ```json
   "ReverseProxy": {
      "Clusters": {
         "arcgis": {
         "Destinations": {
            "arcgis/destination1": {
               "Address": "https://arcgis/rest/services/the/MapServer"
            }
         }
         }
      }
   },
   ```

1. Add a `ConnectionStrings` property to `appsettings.Development.json` with the connection string for the database

   ```json
   "ConnectionStrings": {
      "DefaultConnection": "Server=;Database=;UID=;PWD=;Timeout=5;Encrypt=True;"
   },
   ```

1. Set the client secret and id from the ApAdmin UtahId project credentials page from the `/src` folder

   ```sh
   dotnet user-secrets set "Authentication:UtahId:ClientId" "<client-id>"
   dotnet user-secrets set "Authentication:UtahId:ClientSecret" "<client-secret>"
   ```

1. Start the application

- You can debug with the `Debug` vscode launch profile or
- `dotnet run`

1. optionally run both the dot net and client apps by running `npm run start:all` from `src/ClientApp`

### forklift

1. From python 3 create a virtual environment

- `python -m venv .env`

1. Update pip

- `python -m pip install -U pip`

1. Install python requirements

- `pip install -r requirements.dev.txt`

1. Create `api.py` and `database.py` files from the templates in the `vault` folder

## Deployment

### website deployment

_This website uses standard version and conventional commits. The changelog and versions are managed by conventional commit messages and semantic versioning._

GitHub action pipelines will deploy this application to the cloud.

### forklift deployment

1. Install python requirements to forklift environment

- `pip install -r requirements.txt`

1. Update secrets in the following files

- Remove `.template` from `vault\database.template.py`
- Remove `.template` from `vault\api.template.py`

1. Create `corrections` database
1. Run [schema.sql](/scripts/schema.sql) to create the `offenders` table

### logs

The logs for this project are sent to [Stackdriver](https://console.cloud.google.com/logs/viewer?project=ut-dts-agrc-parole-dev&resource=global&minLogLevel=0&expandAll=false&customFacets=&limitCustomFacetWidth=true&advancedFilter=resource.type%3D%22global%22%0AlogName%3D%22projects%2Fut-dts-agrc-parole-dev%2Flogs%2Fparole-api%22)
