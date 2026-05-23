# CodeLearn - Multiple Choice Quiz

CodeLearn implements a 10-question Object-Oriented Programming multiple-choice quiz for SOFTENG 754 Assignment 6. The frontend loads questions from the backend, submits selected answers, and displays immediate feedback, hints, score, accuracy, time taken, and answer review.

## Running the Application

Start the backend:

```bash
cd backend
npm install
node server.js
```

Start the frontend in a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

## Performance Test

The Apache JMeter files are stored in:

```text
src/test/resources/performancetest/
```

This folder contains:

```text
quiz-api-load-test.jmx
run-task3-load-test.sh
results/
```

Make sure the backend is running, then run the test from the project root:

```bash
./src/test/resources/performancetest/run-task3-load-test.sh
```

If permission is denied, run:

```bash
chmod +x src/test/resources/performancetest/run-task3-load-test.sh
./src/test/resources/performancetest/run-task3-load-test.sh
```

CSV results are generated in:

```text
src/test/resources/performancetest/results/
```