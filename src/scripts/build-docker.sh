#!/usr/bin/env bash

set -eo pipefail

DATABASE_URL=$1
DISCORD_WEBHOOK_URL=$2

if [ -z "$1" ]; then
  echo "Please provide DATABASE_URL"
  exit 1
fi

if [ -z "$2" ]; then
  echo "Please provide DISCORD_WEBHOOK_URL"
  exit 1
fi

docker build \
--tag "jj-it-fetcher" \
--build-arg DATABASE_URL="$1" \
--build-arg DISCORD_WEBHOOK_URL="$2" \
-f "./Dockerfile" \
.
