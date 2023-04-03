set -e
cd "$(dirname "$0")/.."

podman-compose down
echo "starting databases"
podman-compose --file docker-compose.yaml --file docker-compose.override.yaml up --detach cache

echo "starting api"
cd src
dotnet watch
