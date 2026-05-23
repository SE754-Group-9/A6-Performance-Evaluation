# CodeLearn - Multiple Choice Quiz

CodeLearn is a minimal learning application for SOFTENG 754 Assignment 6. It implements a 10-question Object-Oriented Programming multiple-choice quiz. The frontend loads questions from the backend, submits selected answers, and displays immediate correctness feedback, hints, score, accuracy, time taken, and answer review.

## Project Structure

```text
A6-PERFORMANCE-EVALUATION/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── src/test/resources/performancetest/
│   ├── quiz-api-load-test.jmx
│   ├── run-task3-load-test.sh
│   └── results/
│       ├── load-test-20260522-120741.csv
│       └── load-test-20260522-120758.csv
│
├── .gitignore
└── README.md
```

## Running the Application

### 1. Start the backend

The backend runs on port `3001`.

```bash
cd backend
npm install
node server.js
```

Expected output:

```text
CodeLearn API running at http://localhost:3001
```

### 2. Start the frontend

Open a second terminal. The frontend runs on port `5173`.

```bash
cd frontend
npm install
npm run dev
```

Then open:

```text
http://localhost:5173
```

## API Endpoints

The backend exposes the following endpoints:

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/health` | GET | Checks that the backend is running |
| `/api/questions` | GET | Returns the 10 quiz questions without exposing correct answers |
| `/api/submit` | POST | Submits an answer and returns whether it is correct |
| `/api/questions/:id/hint` | GET | Returns the hint for a selected question |

Example `POST /api/submit` request body:

```json
{
  "questionId": 1,
  "selectedIndex": 1
}
```

Example response:

```json
{
  "questionId": 1,
  "correct": true,
  "correctIndex": 1,
  "hint": "An object is an instance of a class that contains data (attributes) and methods (functions)."
}
```

## Performance Test Assets

The Apache JMeter performance test files are stored under:

```text
src/test/resources/performancetest/
```

This folder contains:

| File or Folder | Purpose |
|---|---|
| `quiz-api-load-test.jmx` | JMeter test plan for the quiz API load test |
| `run-task3-load-test.sh` | Helper script for running the JMeter test in non-GUI mode |
| `results/` | CSV result files and generated dashboard output |

## Performance Test Scope

The JMeter test targets the backend API directly. This allows response time, throughput, error rate, and response correctness to be measured independently of browser rendering.

The tested endpoints are:

- `GET /api/health`
- `GET /api/questions`
- `POST /api/submit`

The selected performance testing type is load testing. The scenario simulates repeated quiz API usage by virtual users who:

1. check service availability,
2. fetch the quiz questions, and
3. submit a representative answer.

## Default JMeter Test Configuration

| Setting | Value |
|---|---|
| Backend host | `127.0.0.1` |
| Backend port | `3001` |
| Virtual users | `20` |
| Ramp-up period | `10` seconds |
| Loops per user | `5` |
| Think time | `300 ms` |
| Response-time assertion threshold | `300 ms` |

With the default configuration, the test produces:

```text
20 users × 5 loops = 100 samples per endpoint
3 endpoints × 100 samples = 300 total samples
```

## Running the JMeter Test

Make sure the backend is running first:

```bash
cd backend
node server.js
```

Then, from the project root, run:

```bash
./src/test/resources/performancetest/run-task3-load-test.sh
```

If permission is denied, run:

```bash
chmod +x src/test/resources/performancetest/run-task3-load-test.sh
./src/test/resources/performancetest/run-task3-load-test.sh
```

Optional overrides can be provided as environment variables:

```bash
HOST=127.0.0.1 PORT=3001 USERS=30 RAMP_UP=15 LOOPS=10 RESPONSE_MS=300 THINK_TIME_MS=500 \
./src/test/resources/performancetest/run-task3-load-test.sh
```

## JMeter Assertions

The JMeter test plan includes assertions for:

- HTTP `200` status responses,
- response body correctness,
- response time threshold checking.

The question loading request checks that the response contains the expected total number of questions. The submit request checks that the response contains key correctness fields such as `questionId`, `correct`, and `correctIndex`.

## Test Results

CSV test results are generated in:

```text
src/test/resources/performancetest/results/
```

The report includes screenshots of the JMeter Aggregate Report, Thread Group configuration, View Results Tree, and response assertions as supporting evidence for Task 3.

## Notes

- The quiz data is stored in memory in the backend.
- No database, authentication, or persistent user progress is included.
- The performance test results represent local development performance through `localhost`, not production deployment performance.
- `node_modules` should not be committed to GitHub. Run `npm install` inside `backend` and `frontend` after cloning the repository.