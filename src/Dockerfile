FROM node:16-alpine AS nodejs
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS dotnet
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS dotnet-sdk

FROM nodejs as front-end-build
WORKDIR /build

RUN npm install --global npm

COPY ./ClientApp .

ARG NODE_OPTIONS=--max_old_space_size=4096

RUN npm clean-install
RUN npm run build-react:stage

FROM dotnet-sdk as back-end-build

COPY . ./build
WORKDIR /build

RUN dotnet publish -c Release -o /app -r linux-x64 -p:PublishSingleFile=true --no-self-contained -p:DebugType=embedded -p:PublishReadyToRun=true

FROM dotnet AS server-app
WORKDIR /app

COPY --from=back-end-build /app .
COPY --from=front-end-build /build/build ./front-end

ENTRYPOINT ["dotnet", "parole.dll"]
