require('dotenv').config()
const express = require('express')
const Contact = require('./models/contact')

const morgan = require('morgan')

morgan.token('body', function getBody(req) {
  return JSON.stringify(req.body)
})

const app = express()

app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (!body.name || !body.number)
    return response.status(400).json({
      error: 'name or number missing'
  })

  const duplicateName = persons.find(person => person.name === body.name)

  if (duplicateName)
     return response.status(400).json({
      error: 'name must be unique'
  })

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }
  persons = persons.concat(person)

  response.json(person)
})

app.get('/info', (request, response) => {
  const personsNumber = persons.length
  const date = new Date()
  response.send(
    `<p>Phonebook has info for ${personsNumber} people<p>
    <p>${date}<p>`)
})

app.get('/api/persons', (request, response) => {
   Contact.find({}).then(contacts => {
    response.json(contacts)
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})