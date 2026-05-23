# Task 3 Performance Test Assets

This directory contains the Apache JMeter assets for `Task 3: Performance Testing and Evaluation`.

## Scope

The current frontend does not call the backend API. The performance test therefore targets the backend endpoints directly:

- `GET /api/health`
- `GET /api/questions`
- `POST /api/submit`

The selected test type is a **load test**. The scenario simulates repeated quiz usage by virtual users who:

1. check service availability,
2. fetch the quiz questions, and
3. submit an answer.

## Files

- `quiz-api-load-test.jmx`: JMeter test plan
- `run-task3-load-test.sh`: helper script to run the plan in non-GUI mode
- `results/`: generated CSV results and HTML dashboard output

## Default assumptions

- backend host: `127.0.0.1`
- backend port: `3001`
- virtual users: `20`
- ramp-up: `10` seconds
- loops per user: `5`
- response-time assertion threshold: `1000 ms`
- think time between requests: `300 ms`

These values can be overridden with JMeter properties when running the test.

## Run

Start the backend first, then run:

```bash
cd /Users/liuxiaoping/Documents/A6-Performance-Evaluation
src/test/resources/performancetest/run-task3-load-test.sh
```

Optional overrides:

```bash
HOST=127.0.0.1 PORT=3001 USERS=30 RAMP_UP=15 LOOPS=10 RESPONSE_MS=1200 THINK_TIME_MS=500 \
src/test/resources/performancetest/run-task3-load-test.sh
```

## Notes

- The test plan includes assertions for HTTP 200, response body correctness, and response time.
- CSV results are generated in `results/`.
- An HTML dashboard is also generated for report screenshots.
