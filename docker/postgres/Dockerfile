FROM postgres:13.4

COPY ./docker/postgres/create-app-user.sh /docker-entrypoint-initdb.d/create-app-user.sh
COPY ./docker/postgres/create-migrator-user.sh /docker-entrypoint-initdb.d/create-migrator-user.sh
COPY ./docker/postgres/create-schema.sh /docker-entrypoint-initdb.d/create-schema.sh
