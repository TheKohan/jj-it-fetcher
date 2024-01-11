#!/usr/bin/env bash

set -eo pipefail

DATABASE_URL=$1

if [ -z "$1" ]; then
  echo "Please provide DATABASE_URL"
  exit 1
fi

docker build \
--tag "jj-it-fetcher" \
--build-arg DATABASE_URL="$1" \
-f "./Dockerfile" \
.
