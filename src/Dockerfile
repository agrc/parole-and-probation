FROM node:lts-alpine AS nodejs
FROM mcr.microsoft.com/dotnet/aspnet:10.0-noble-chiseled AS dotnet
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS dotnet-sdk

FROM nodejs AS front-end-build
WORKDIR /build

ENV NODE_OPTIONS=--max-old-space-size=4096

ARG PNPM_VERSION=latest
RUN if command -v corepack >/dev/null 2>&1; then \
      corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate; \
    else \
      npm install -g pnpm@${PNPM_VERSION}; \
    fi

COPY ./src/ClientApp .
ARG VITE_DISCOVER $VITE_DISCOVER
ARG VITE_WEB_API $VITE_WEB_API
ARG VITE_PRINT_PROXY $VITE_PRINT_PROXY

RUN pnpm install
RUN pnpm copy:arcgis
RUN pnpm build

FROM dotnet-sdk AS back-end-build

COPY . ./build
WORKDIR /build/src

RUN dotnet build -c Release -o /app

FROM back-end-build AS back-end-release-build

RUN dotnet publish -c Release -o /app -r linux-x64 -p:PublishSingleFile=true --no-self-contained -p:DebugType=embedded -p:PublishReadyToRun=true

FROM dotnet AS server-app

WORKDIR /app

COPY --from=back-end-release-build /app .
COPY --from=front-end-build /build/dist ./ClientApp/dist

ENTRYPOINT ["dotnet", "app.dll"]
