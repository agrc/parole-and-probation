set -e
cd "$(dirname "$0")/.."

docker-compose down
echo "starting databases"
docker-compose --file docker-compose.yaml up --detach cache

echo "starting api"
cd src

export NODE_ENV=development
export ASPNETCORE_ENVIRONMENT=Development
export ASPNETCORE_HOSTINGSTARTUPASSEMBLIES=Microsoft.AspNetCore.SpaProxy
export ASPNETCORE_URLS="https://localhost:5001;http://localhost:5000"

dotnet watch --launch-profile "app"
