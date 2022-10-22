#!/bin/bash

docker compose down
docker compose --env-file .docker-env up -d 