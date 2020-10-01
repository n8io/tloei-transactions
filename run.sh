#!/bin/bash
set -e

CMD=$1
LOG_NAME=${2:-test}
SCRIPT=$(realpath $0)
DIR=$(dirname "$SCRIPT")
LOG="${DIR}/logs/${LOG_NAME}.log"
BIN_TEE=/usr/bin/tee

export NVM_DIR="/root/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

cd "$DIR"

export APPLY_TRANSACTIONS=${APPLY_TRANSACTIONS:-1}
export PRINT=1

if [ -z "$CMD" ]; then
  yarn -s run start 2>&1 | "$BIN_TEE" -a "$LOG"
elif [ $CMD = "previous" ]; then
  PREVIOUS_WEEK=1 yarn -s run start 2>&1 | "$BIN_TEE" -a "$LOG"
fi
