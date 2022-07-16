const express = require('express')
const app = express()

app.use(express.json())
/* The json-parser functions 
so that it takes the JSON data of a request, 
transforms it into a JavaScript object 
and then attaches it 
to the body property of the request object
before the route handler is called */

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
  res.json(persons)
  /* Calling the method will send the notes array 
  that was passed to it as a JSON formatted string. 
  Express automatically sets the Content-Type header 
  with the appropriate value of application/json. */
})

app.get('/info', (req, res) => {
  const date = new Date()
  const info = `Phonebook has info for ${persons.length} people`
  const content = `<p> ${info}</p> <p>${date}</p> `
  console.log(content)
  res.send(content)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
