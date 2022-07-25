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

app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(people => {res.json(people)}).catch(err => next(err))
})

app.get('/info', (req, res, next) => {
  const date = new Date()
  Person.find({}).then(people => {
    console.log(people)
    let numOfPeople = people.length
    const info = `Phonebook has info for ${numOfPeople} people`
    const content = `<p> ${info}</p> <p>${date}</p> `
    res.send(content)
  })
  .catch(err => next(err))
})

app.get('/api/persons', (req, res, next) => {
  Person
  .find({})
  .then(people => {res.json(people)})
  .catch(err => next(err))
})

app.get('/info', (req, res, next) => {
  const date = new Date()
  Person
  .find({})
  .then(people => {
    const numOfPeople = people.length
    const info = `Phonebook has info for ${numOfPeople} people`
    const content = `<p> ${info}</p> <p>${date}</p> `
    res.send(content)
  })
  .catch(err => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person
  .findById(req.params.id)
  .then(person => {
    res.json(person)
  })
  .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person
  .findByIdAndRemove(req.params.id)
  .then(result => res.status(204).end())
  .catch(err => next(err))
})

app.post('/api/persons', (req, res, next) => {
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
    
    newPerson
    .save()
    .then(addedPerson => {
      console.log(`${addedPerson.name} added`)
      res.json(addedPerson)
    })
    .catch(err => next(err))
  }
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const person = {
    name: body.name,
    number: body.number
  }
  Person.findByIdAndUpdate(req.params.id, person, {new: true})
  .then(updatedPerson => {
    res.json(updatedPerson)
  })
  .catch(err => next(err))
})

const errorHandler = (err, req, res, next) => {
  console.log(err.message)

  if (err.name === 'CastError'){
    return res.status(400).send({err: 'malformatted id'})
  }

  next(err)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
