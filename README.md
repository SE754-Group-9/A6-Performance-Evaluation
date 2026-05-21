# CodeLearn - Multiple Choice Quiz

An interactive OOP learning application featuring a 10-question multiple-choice quiz on Object-Oriented Programming concepts.

## Running the App

**Backend** (port 3001):
```
cd backend
node server.js
```

**Frontend** (port 5173):
```
cd frontend
npm run dev
```

Then open http://localhost:5173

## API Endpoints

- `GET /api/questions` — returns all 10 quiz questions
- `POST /api/submit` — submit an answer `{ questionId, selectedIndex }`
- `GET /api/health` — health check
