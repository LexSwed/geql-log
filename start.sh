set -e
set -o allexport
source .env
set +o allexport

docker-compose up -d
. ./.env && yarn db:migrate
yarn prisma generate
npx npm-run-all -p dev prisma:watch