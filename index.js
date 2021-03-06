require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(express.json())

//define morgan token
morgan.token('req-body', (req) => JSON.stringify(req.body))
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
        .then(() => res.status(204).end())
        .catch(err => next(err))
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body
    const newPerson = new Person({
        name: body.name,
        number: body.number,
    })

    Person
        .find({})
        .then(people => {
            const existed = people.find((element) => element.name === body.name)
            if(existed){
                throw new Error(`${existed.name} already in phonebook, please add another name`)
            }else{
                newPerson
                    .save()
                    .then(addedPerson => {
                        console.log(`${addedPerson.name} added`)
                        res.json(addedPerson)
                    })
                    .catch(err => next(err))
            }
        }).catch(err => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body
    const person = {
        name: body.name,
        number: body.number
    }
    Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context: 'query' })
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(err => next(err))
})

const errorHandler = (err, req, res, next) => {
    console.log(err.message)

    if (err.name === 'CastError'){
        return res.status(400).send({ err: 'malformatted id' })
    }else if(err.name === 'ValidationError'){
        return res.status(400).send({ err: err.message })
    }else if(err.name === 'Error'){
        return res.status(400).send({ err: err.message })
    }
    next(err)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
