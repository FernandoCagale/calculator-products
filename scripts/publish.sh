#!/bin/sh

set -e

[ -z "$DEBUG" ] || set -x

echo "\n===> Generate image...\n"

docker build --no-cache -f Dockerfile -t calculator-client .

echo "\n===> Docker tag...\n"

docker tag calculator-client fernandocagale/calculator-client

echo "\n===> Docker push...\n"

docker push fernandocagale/calculator-client