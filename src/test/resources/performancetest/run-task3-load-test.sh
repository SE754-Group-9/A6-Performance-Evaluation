#!/bin/zsh
set -euo pipefail

ROOT="/Users/liuxiaoping/Documents/A6-Performance-Evaluation"
TEST_DIR="$ROOT/src/test/resources/performancetest"
RESULTS_DIR="$TEST_DIR/results"
PLAN="$TEST_DIR/quiz-api-load-test.jmx"

HOST="${HOST:-127.0.0.1}"
PORT="${PORT:-3001}"
USERS="${USERS:-20}"
RAMP_UP="${RAMP_UP:-10}"
LOOPS="${LOOPS:-5}"
RESPONSE_MS="${RESPONSE_MS:-1000}"
THINK_TIME_MS="${THINK_TIME_MS:-300}"

TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
RESULT_FILE="$RESULTS_DIR/load-test-$TIMESTAMP.csv"
DASHBOARD_DIR="$RESULTS_DIR/dashboard-$TIMESTAMP"

mkdir -p "$RESULTS_DIR"

jmeter -n \
  -t "$PLAN" \
  -l "$RESULT_FILE" \
  -e -o "$DASHBOARD_DIR" \
  -Jhost="$HOST" \
  -Jport="$PORT" \
  -Jusers="$USERS" \
  -JrampUp="$RAMP_UP" \
  -Jloops="$LOOPS" \
  -JresponseTimeMs="$RESPONSE_MS" \
  -JthinkTimeMs="$THINK_TIME_MS"

echo "CSV results: $RESULT_FILE"
echo "HTML dashboard: $DASHBOARD_DIR/index.html"
