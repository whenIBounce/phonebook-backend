require('dotenv').config()
const { application } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(express.json())

//define morgan token
morgan.token('req-body', (req, res) => JSON.stringify(req.body))
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :req-body'
  )
)
/* The json-parser functions 
so that it takes the JSON data of a request, 
transforms it into a JavaScript object 
and then attaches it 
to the body property of the request object
before the route handler is called */
app.use(cors())
app.use(express.static('build'))

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

app.get('/api/persons', (req, res) => {
  Person.find({}).then(people => {res.json(people)})
})

app.get('/info', (req, res) => {
  const date = new Date()
  Person.find({}).then(people => {
    console.log(people)
    let numOfPeople = people.length
    const info = `Phonebook has info for ${numOfPeople} people`
    const content = `<p> ${info}</p> <p>${date}</p> `
    res.send(content)
  })
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(person => {
    res.json(person)
  })
})

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id)
  .then(result => res.status(204).end())
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  //const nameExisted = persons.find((p) => p.name === body.name)

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number missing',
    })
  } /* else if (nameExisted) {
    return res.status(400).json({
      error: 'name must be unique',
    }) */
  else {
    const newPerson = new Person({
      name: body.name,
      number: body.number,
    })    
    
    newPerson.save().then(addedPerson => {
      console.log(`${addedPerson.name} added`)
      res.json(addedPerson)
    })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
