#!/bin/bash
# Docker entrypoint script.

# Wait until Postgres is ready

# echo $PGDATABASE
# while ! pg_isready -q -h $PGHOST -p $PGPORT -U $PGUSER
# do
#   echo $PGHOST
#   echo $PGPORT
#   echo $PGUSER
#   echo $PGDATABASE
#   echo "$(date) - waiting for database to start"
#   sleep 2
# done

# Create, migrate, and seed database if it doesn't exist.
if [[ -z `psql -Atqc "\\list $PGDATABASE"` ]]; then
  echo "Database $PGDATABASE does not exist. Creating..."
  mix ecto.setup
  # createdb -E UTF8 $PGDATABASE -l en_US.UTF-8 -T template0
  # mix ecto.migrate
  # mix run priv/repo/seeds.exs
  # echo "Database $PGDATABASE created."
fi

exec mix phx.server
