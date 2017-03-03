#!/bin/bash

# Error out on fail
set -e

# SCRIPTS_DIR
OS=$(uname -a)
if [[ $OS =~ "Darwin"  ]];then
  # mac
  SCRIPTS_DIR=$([[ $0 = /* ]] && echo "$(dirname $0)" || echo "$(dirname $PWD/${0#./})")
else
  # linux
  SCRIPTS_DIR=$(dirname $(readlink -f $0))
fi
MAIN_DIR="${SCRIPTS_DIR}/.."

pushd "${MAIN_DIR}"

  # Install dependencies
  npm install -g grunt-cli
  npm install -g istanbul
  npm install

  # Code Coverage
  istanbul cover _mocha -- -R spec

  # Tests
  mocha
popd
