#!/bin/bash

# DOCKER_CONTAINER_NAME="bespokedbikes_pg"
# timeout 90s bash -c "until docker exec $DOCKER_CONTAINER_NAME pg_isready ; do sleep 5 ; done"

docker compose down
docker compose --env-file .docker-env up -d 