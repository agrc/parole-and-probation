set -e
cd "$(dirname "$0")/.."

docker compose down
echo "starting databases"
docker compose --file docker-compose.yaml --file docker-compose.override.yaml up --detach cache

echo "starting api"
cd src
dotnet watch
