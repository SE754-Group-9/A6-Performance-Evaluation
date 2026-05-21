const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

const questions = [
  {
    id: 1,
    topic: 'Classes and Objects',
    question: 'Which of the following best describes an object in object-oriented programming?',
    options: [
      'A blueprint for creating objects.',
      'An instance of a class with its own state and behavior.',
      'A programming language used to implement OOP.',
      'A method used to call a function.',
    ],
    correctIndex: 1,
    hint: 'An object is an instance of a class that contains data (attributes) and methods (functions).',
  },
  {
    id: 2,
    topic: 'Classes and Objects',
    question: 'What is a class in object-oriented programming?',
    options: [
      'A specific instance that holds data values.',
      'A collection of unrelated functions.',
      'A blueprint or template used to create objects.',
      'A type of loop used in programming.',
    ],
    correctIndex: 2,
    hint: 'A class defines the structure and behavior that its objects will have.',
  },
  {
    id: 3,
    topic: 'Encapsulation',
    question: 'What does encapsulation mean in OOP?',
    options: [
      'The ability of a class to inherit from multiple parent classes.',
      'Bundling data and the methods that operate on that data within a single unit, and restricting access from outside.',
      'Creating multiple methods with the same name but different parameters.',
      'Defining a method in a subclass that overrides a parent class method.',
    ],
    correctIndex: 1,
    hint: 'Encapsulation hides the internal state of an object and requires all interaction through an object\'s methods.',
  },
  {
    id: 4,
    topic: 'Inheritance',
    question: 'Which OOP principle allows a class to reuse the attributes and methods of another class?',
    options: ['Polymorphism', 'Encapsulation', 'Abstraction', 'Inheritance'],
    correctIndex: 3,
    hint: 'Inheritance allows a subclass to acquire the properties and behaviors of a superclass.',
  },
  {
    id: 5,
    topic: 'Polymorphism',
    question: 'What is polymorphism in OOP?',
    options: [
      'The ability of different objects to respond to the same method call in different ways.',
      'A method that can only be called once per program execution.',
      'The process of converting one data type to another.',
      'The act of hiding a class from other classes.',
    ],
    correctIndex: 0,
    hint: 'Polymorphism means "many forms" — the same interface can be used for different underlying types.',
  },
  {
    id: 6,
    topic: 'Abstraction',
    question: 'Which statement best describes abstraction in OOP?',
    options: [
      'Storing multiple values in a single variable.',
      'Hiding complex implementation details and showing only essential features.',
      'Allowing a class to inherit from another class.',
      'Making all class attributes publicly accessible.',
    ],
    correctIndex: 1,
    hint: 'Abstraction simplifies complex reality by exposing only relevant operations.',
  },
  {
    id: 7,
    topic: 'Access Modifiers',
    question: 'Which access modifier makes a class member accessible only within its own class?',
    options: ['public', 'protected', 'private', 'static'],
    correctIndex: 2,
    hint: 'The `private` modifier restricts access so only the declaring class can access the member.',
  },
  {
    id: 8,
    topic: 'Constructors',
    question: 'What is the purpose of a constructor in a class?',
    options: [
      'To destroy an object when it is no longer needed.',
      'To define the return type of a method.',
      'To initialise a newly created object with default or provided values.',
      'To prevent the class from being subclassed.',
    ],
    correctIndex: 2,
    hint: 'A constructor is automatically called when an object is created to set up its initial state.',
  },
  {
    id: 9,
    topic: 'Design Patterns',
    question: 'Which design pattern ensures that a class has only one instance and provides a global point of access to it?',
    options: ['Factory Pattern', 'Observer Pattern', 'Singleton Pattern', 'Strategy Pattern'],
    correctIndex: 2,
    hint: 'The Singleton Pattern restricts instantiation of a class to a single object.',
  },
  {
    id: 10,
    topic: 'Method Overriding',
    question: 'What is method overriding in OOP?',
    options: [
      'Defining two methods with the same name but different parameter lists in the same class.',
      'Calling a parent class method from a child class constructor.',
      'A child class providing its own implementation of a method already defined in its parent class.',
      'Preventing a method from being called more than once.',
    ],
    correctIndex: 2,
    hint: 'Method overriding lets a subclass replace the behavior of an inherited method.',
  },
]

// GET all questions (without correct answers for the frontend quiz)
app.get('/api/questions', (req, res) => {
  const safeQuestions = questions.map(({ correctIndex, hint, ...q }) => q)
  res.json({ questions: safeQuestions, total: safeQuestions.length })
})

// POST submit an answer
app.post('/api/submit', (req, res) => {
  const { questionId, selectedIndex } = req.body

  if (questionId === undefined || selectedIndex === undefined) {
    return res.status(400).json({ error: 'questionId and selectedIndex are required' })
  }

  const question = questions.find(q => q.id === questionId)
  if (!question) {
    return res.status(404).json({ error: 'Question not found' })
  }

  const correct = selectedIndex === question.correctIndex
  res.json({
    questionId,
    correct,
    correctIndex: question.correctIndex,
    hint: question.hint,
  })
})

// GET quiz results summary
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`CodeLearn API running at http://localhost:${PORT}`)
})
