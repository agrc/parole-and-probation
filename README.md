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
   - `pnpm install`
1. Duplicate `src/ClientApp/.env` to `src/ClientApp/.env.local` and add the correct values
1. Start the development server
   - `pnpm start`

_The offender feature service will not function since the reverse proxy dotnet service is not running._

### Offline use

The map supports a limited offline mode. Users must first load the application while online and allow the map data to finish loading. After disconnecting, the application can display and identify the offender points that were loaded before disconnecting and can filter the data available in the local map layer.

Offline results are intentionally incomplete. Details that require the API, including enriched offender information and photos, will not be available. CSV export and other backend-dependent operations also require a connection. The basemap is not guaranteed to be available offline.

The service worker precaches the ArcGIS worker assets needed by the offline map. Those assets are assigned content-based revisions during the production build so changed ArcGIS files are downloaded instead of being served from an older browser cache.

### asp.net core mvc

1. Install the [dotnet 10.0.\* SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
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

1. Start the redis database
   - docker-compose up -d cache

1. Connect to VPN if you are not on the network so that the api can access the test database.

1. Start the api
   - You can debug with the `Debug` vscode launch profile or execute
   - `./scripts/watch.sh`

1. optionally run both the dot net and client apps by running `pnpm run start:all` from `src/ClientApp`

1. Navigate to `http://localhost:5173/development` (note the /development is required to complete the auth flow)

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

_This website uses release please and conventional commits. The changelog and versions are managed by conventional commit messages and semantic versioning._

GitHub action pipelines will deploy this application to the cloud.

### forklift deployment

1. Install python requirements to forklift environment

- `pip install -r requirements.txt`

1. Update secrets in the following files

- Remove `.template` from `vault\database.template.py`
- Remove `.template` from `vault\api.template.py`

1. Create `corrections` database

### logs

The logs for this project are sent to [Stackdriver](https://console.cloud.google.com/logs/viewer?project=ut-dts-agrc-parole-dev&resource=global&minLogLevel=0&expandAll=false&customFacets=&limitCustomFacetWidth=true&advancedFilter=resource.type%3D%22global%22%0AlogName%3D%22projects%2Fut-dts-agrc-parole-dev%2Flogs%2Fparole-api%22)

## Attribution

This project was developed with the assistance of [GitHub Copilot](https://github.com/features/copilot).
