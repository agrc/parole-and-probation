# Copilot Instructions

## Repository Overview

This is the Utah AP&P Field Map, a web application used to find and inspect parole and probation offender records on an ArcGIS map. It is a mixed .NET/JavaScript/Python repository:

- `src/` is an ASP.NET Core 10 web host and API. It serves the built SPA, authenticates users with UtahId, stores distributed auth state in Redis, proxies ArcGIS services with YARP, queries SQL Server, and provides lookup, token, email, and CSV export services.
- `src/ClientApp/` is a React 19 + Vite SPA using ArcGIS Maps SDK, React Query, React Router, Tailwind, React Aria, and Storybook.
- `forklift/` contains Python data-loading and transformation utilities for ArcGIS/SQL Server. `scripts/` contains supporting publishing and local-run scripts.
- `data/` documents the source data schema and lookup values; `forklift/sql/` contains database shape, key, and index scripts. `maps/` contains ArcGIS Pro artifacts.

There is no root `package.json`; there is one .NET project (`src/app.csproj`) targeting `net10.0`, and the client has its own `package.json` and lockfile. Running pnpm from the root fails with `ERR_PNPM_NO_PKG_MANIFEST`. The repository does not contain `CONTRIBUTING.md`, backend tests, or Python tests. Preserve existing behavior and avoid placing credentials in source, documentation, or commits.

## Build, Test, and Validate

Always run client commands from `src/ClientApp` and backend commands from `src`. The verified local tools are Node, PNPM, and .NET SDK; CI installs pnpm 11, uses Node `lts/*`, and targets .NET 10. Do not run pnpm from the repository root.

For a client change, use this order:

```sh
cd src/ClientApp
pnpm install --frozen-lockfile
pnpm run lint
pnpm test --run
pnpm run build
```

`pnpm install --frozen-lockfile`, `pnpm run lint`, `pnpm test --run`, and `pnpm run build` have been verified successfully. Pull request CI runs the same install, then `pnpm run lint`, then `pnpm test` (Vitest non-watch mode). The current suite is small: 1 file and 12 tests, primarily testing filter-to-SQL mapping. Use `pnpm test --run` locally to make the non-watch behavior explicit. `pnpm test:watch` is interactive and should not be used in automation.

For a backend change, use:

```sh
cd src
dotnet clean
dotnet build
```

`dotnet clean` and the subsequent `dotnet build` have been verified successfully. The build currently reports NU1902 warnings for known moderate vulnerabilities in `MailKit 4.14.1` and its `MimeKit 4.14.0` dependency, but exits successfully; do not treat these expected warnings as a build failure. A build launched from `src/ClientApp` fails with MSB1003 because that directory has no project or solution; change to `src` first. The VS Code `build` task is equivalent to `dotnet build` in `src`. The project uses nullable reference types, deterministic builds, C# `preview`, and `aspnetcore.ruleset`.

Useful client scripts are `pnpm start` (Vite on port 5173), `pnpm run start:all` (starts the .NET project from the client directory), `pnpm run storybook` (port 9009), `pnpm run build-storybook`, and `pnpm run format` (writes Prettier formatting). `pnpm run format` is a write operation, not a check. Storybook and the long-running start commands are not part of CI and were not run as unattended validation. There is no configured format-check script.

The Python workflow is documented but not CI-backed. For `forklift` changes, create and activate a Python 3 virtual environment, then run `python -m pip install -U pip` and `pip install -r requirements.dev.txt`. Runtime dependencies include pandas, SQLAlchemy, pyodbc, requests, pyproj, and xxhash; development tools include YAPF, pylint, pylint-quotes, and isort. `setup.cfg` configures pytest/pylint/isort, but no Python test suite is present. Publishing scripts additionally require ArcGIS Pro's `arcpy` and local ArcGIS/database files, so do not assume they work in a cloud agent.

The local Compose file validates with `docker compose config` and defines Redis 6 on `localhost:6379` plus an optional API image. `scripts/watch.sh` runs `docker-compose down`, starts the Redis cache, sets Development environment variables and HTTPS URLs, and runs `dotnet watch --launch-profile "app"`; it is intended for an interactive local environment, not CI. The Dockerfile performs a multi-stage client build, .NET Release build/publish, and combines them into a .NET 10 chiseled runtime image. Its dependency install is not frozen, so use the frozen lockfile command for deterministic local/CI client validation.

## Local Runtime Requirements

The client can build without service credentials. Running the complete application requires Docker/Redis, a local HTTPS certificate, SQL Server access (usually VPN access), ArcGIS credentials and host, a YARP `ReverseProxy` destination, and UtahId OAuth user secrets. Follow `README.md` for the required development-only `appsettings.Development.json` sections: `ArcGIS`, `ReverseProxy`, and `ConnectionStrings:DefaultConnection`. Set secrets from `src` with `dotnet user-secrets set "Authentication:UtahId:ClientId" "<client-id>"` and the corresponding `ClientSecret` command. Do not invent or commit these values.

The client reads Vite `VITE_*` variables from local environment files. The backend proxy targets HTTPS port 5001 for `/api`, `/secure`, `/mugshot`, `/otrackws`, and `/development`. The development auth flow requires opening `http://localhost:5173/development`. Offender lookup and CSV export will not work without the backend, database, VPN, and relevant ArcGIS configuration.

## Architecture and Change Navigation

- `src/Program.cs`: host construction, Serilog, production secret-file loading, and `ClientApp/dist` web root.
- `src/Startup.cs`: dependency injection, UtahId/cookie authorization, Redis, YARP, HTTP retry/timeout policies, API routes, and SPA fallback.
- `src/Features/Download/`: SQL filtering and CSV export/email delivery.
- `src/Features/Lookups/LookupService.cs`: agent lookup data.
- `src/Features/Tokens/TokenService.cs`: ArcGIS token acquisition and caching.
- `src/Infrastructure/`: Redis ticket storage, forwarded headers, UtahId helpers, and exception middleware.
- `src/ClientApp/src/main.jsx`, `Routes.jsx`, and `App.jsx`: client bootstrap, routing, and map/filter application state.
- `src/ClientApp/src/components/`: map, filter, identify, sidebar, download, and Storybook components. `Filters.test.js` is the existing unit-test entry point.
- `src/ClientApp/vite.config.js`, `eslint.config.js`, `tailwind.config.js`, and `.storybook/`: client build, lint, styling, and component-preview configuration.
- `src/appsettings*.json`, `src/Properties/launchSettings.json`, and `docker-compose.yaml`: environment and local runtime configuration. Production reads `/secrets/dotnet/appsettings.Production.json`.
- `.github/workflows/pull_request.yml`: PR install, lint, and client tests. `push.yml` runs Release Please on `dev`/`main`; `release.yml` builds/pushes the Docker image and deploys Cloud Run. Release builds receive `VITE_DISCOVER`, `VITE_WEB_API`, and `VITE_PRINT_PROXY` as build arguments.

Before considering a change complete, inspect the nearest existing implementation and its tests, run the narrowest relevant check, then run the full client sequence and `dotnet build` when the change crosses the corresponding boundary. Trust these instructions and only search the repository when a detail here is incomplete or contradicted by the current files or command output.
