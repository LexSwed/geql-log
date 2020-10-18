set -e
set -o allexport
source .env
set +o allexport

docker-compose up -d
. ./.env && yarn prisma:migrate
yarn prisma generate
npx npm-run-all -p dev prisma:watch