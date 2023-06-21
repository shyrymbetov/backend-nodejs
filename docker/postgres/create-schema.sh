#!/bin/bash
set -e

POSTGRES="psql ${DB_NAME} --username ${POSTGRES_USER}"

echo "Creating schema: ${DB_SCHEMA}"

$POSTGRES <<-EOSQL
CREATE SCHEMA ${DB_SCHEMA};
GRANT ALL ON SCHEMA ${DB_SCHEMA} TO ${DB_MIGRATOR_USER};
GRANT USAGE ON SCHEMA ${DB_SCHEMA} TO ${DB_APP_USER};
ALTER DEFAULT PRIVILEGES
FOR USER ${DB_MIGRATOR_USER}
IN SCHEMA ${DB_SCHEMA}
GRANT SELECT, INSERT, UPDATE, DELETE, TRUNCATE ON TABLES TO ${DB_APP_USER};
ALTER DEFAULT PRIVILEGES
FOR USER ${DB_MIGRATOR_USER}
IN SCHEMA ${DB_SCHEMA}
GRANT USAGE, SELECT ON SEQUENCES TO ${DB_APP_USER};
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" SCHEMA ${DB_SCHEMA};
CREATE EXTENSION IF NOT EXISTS ltree SCHEMA ${DB_SCHEMA};
EOSQL