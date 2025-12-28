#!/bin/sh

echo "Starting docker entrypoint for backend"

# Allow overriding the sequelize CLI binary (use shipped devDependency by default via npx)
SEQUELIZE_CMD=${SEQUELIZE_CMD:-npx sequelize-cli}

# Compose sequelize-cli options so it uses the project config and correct folders
SEQUELIZE_OPTS="--config core/config/config.json --migrations-path core/migrations --seeders-path core/seeders --models-path core/models"

MAX_ATTEMPTS=6
SLEEP_SECONDS=5

run_with_retries() {
  cmd="$1"
  attempt=1
  while [ "$attempt" -le "$MAX_ATTEMPTS" ]; do
    echo "Attempt ${attempt} for: ${cmd}"
    if sh -c "$cmd $SEQUELIZE_OPTS"; then
      echo "Command succeeded: ${cmd}"
      return 0
    fi
    echo "Command failed on attempt ${attempt}"
    attempt=$((attempt + 1))
    echo "Waiting ${SLEEP_SECONDS}s before retrying..."
    sleep "${SLEEP_SECONDS}"
  done

  echo "Command failed after ${MAX_ATTEMPTS} attempts: ${cmd}"
  return 1
}

echo "Running migrations"
if ! run_with_retries "${SEQUELIZE_CMD} db:migrate"; then
  echo "Migrations failed. Exiting."
  exit 1
fi

echo "Running seeders"
if ! run_with_retries "${SEQUELIZE_CMD} db:seed:all"; then
  echo "Seeders failed. Exiting."
  exit 1
fi

echo "Starting application"
exec npm start