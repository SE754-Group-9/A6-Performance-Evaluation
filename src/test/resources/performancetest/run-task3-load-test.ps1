$ErrorActionPreference = "Stop"

$SCRIPT_DIR = Split-Path -Parent $MyInvocation.MyCommand.Path
$TEST_DIR = $SCRIPT_DIR
$RESULTS_DIR = Join-Path $TEST_DIR "results"
$PLAN = Join-Path $TEST_DIR "quiz-api-load-test.jmx"

$HOST_NAME = if ($env:HOST_NAME) { $env:HOST_NAME } else { "127.0.0.1" }
$PORT = if ($env:PORT) { $env:PORT } else { "3001" }
$USERS = if ($env:USERS) { $env:USERS } else { "20" }
$RAMP_UP = if ($env:RAMP_UP) { $env:RAMP_UP } else { "10" }
$LOOPS = if ($env:LOOPS) { $env:LOOPS } else { "5" }
$RESPONSE_MS = if ($env:RESPONSE_MS) { $env:RESPONSE_MS } else { "300" }
$THINK_TIME_MS = if ($env:THINK_TIME_MS) { $env:THINK_TIME_MS } else { "300" }

$TIMESTAMP = Get-Date -Format "yyyyMMdd-HHmmss"
$RESULT_FILE = Join-Path $RESULTS_DIR "load-test-$TIMESTAMP.csv"
$DASHBOARD_DIR = Join-Path $RESULTS_DIR "dashboard-$TIMESTAMP"

New-Item -ItemType Directory -Force -Path $RESULTS_DIR | Out-Null

& "C:\apache-jmeter-5.6.3\bin\jmeter.bat" -n `
  -t "$PLAN" `
  -l "$RESULT_FILE" `
  -e -o "$DASHBOARD_DIR" `
  -Jhost="$HOST_NAME" `
  -Jport="$PORT" `
  -Jusers="$USERS" `
  -JrampUp="$RAMP_UP" `
  -Jloops="$LOOPS" `
  -JresponseTimeMs="$RESPONSE_MS" `
  -JthinkTimeMs="$THINK_TIME_MS"

Write-Host "CSV results: $RESULT_FILE"
Write-Host "HTML dashboard: $DASHBOARD_DIR/index.html"