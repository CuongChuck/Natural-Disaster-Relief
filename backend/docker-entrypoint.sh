#!/bin/sh
set -e

echo "Starting docker entrypoint for backend"

# Allow overriding the sequelize CLI binary (use shipped devDependency by default via npx)
SEQUELIZE_CMD=${SEQUELIZE_CMD:-npx sequelize-cli}

# Compose sequelize-cli options so it uses the project config and migration folder
SEQUELIZE_OPTS="--config core/config/config.json --migrations-path core/migrations --models-path core/models"

MAX_ATTEMPTS=6
SLEEP_SECONDS=5
attempt=1
echo "Attempting to run migrations (max ${MAX_ATTEMPTS} attempts)"
while [ $attempt -le $MAX_ATTEMPTS ]
do
  echo "Migration attempt ${attempt}..."
  if ${SEQUELIZE_CMD} db:migrate ${SEQUELIZE_OPTS}; then
    echo "Migrations completed"
    break
  else
    echo "Migrations failed on attempt ${attempt}"
    attempt=$((attempt+1))
    echo "Waiting ${SLEEP_SECONDS}s before retrying..."
    sleep ${SLEEP_SECONDS}
  fi
done

if [ $attempt -gt $MAX_ATTEMPTS ]; then
  echo "Migrations failed after ${MAX_ATTEMPTS} attempts. Exiting."
  exit 1
fi

echo "Starting application"
exec npm start
