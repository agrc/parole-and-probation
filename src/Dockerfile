FROM node:lts-alpine AS nodejs
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS dotnet
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS dotnet-sdk

FROM nodejs as front-end-build
WORKDIR /build

RUN npm install --global npm

COPY ./src/ClientApp .
ARG VITE_DISCOVER $VITE_DISCOVER
ARG VITE_WEB_API $VITE_WEB_API
ARG VITE_PRINT_PROXY $VITE_PRINT_PROXY

RUN npm clean-install
RUN npm run copy:arcgis
RUN npm run build

FROM dotnet-sdk as back-end-build

COPY . ./build
WORKDIR /build/src

RUN dotnet build -c Release -o /app

FROM back-end-build as back-end-release-build

RUN dotnet publish -c Release -o /app -r linux-x64 -p:PublishSingleFile=true --no-self-contained -p:DebugType=embedded -p:PublishReadyToRun=true

FROM dotnet AS server-app

WORKDIR /app

COPY --from=back-end-release-build /app .
COPY --from=front-end-build /build/dist ./ClientApp/dist

ENTRYPOINT ["dotnet", "app.dll"]
