require('dotenv').config()
const express = require('express')
const Contact = require('./models/contact')

const morgan = require('morgan')

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

morgan.token('body', function getBody(req) {
  return JSON.stringify(req.body)
})

const app = express()

app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (!body.name || !body.phoneNumber)
    return response.status(400).json({
      error: 'name or number missing'
  })

  const contact = new Contact ({
    name: body.name,
    phoneNumber: body.phoneNumber
  })

  contact.save().then(savedContact => {
    response.json(savedContact)
  })
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

app.get('/api/persons/:id', (request, response, next) => {
  Contact.findById(request.params.id)
    .then(contact => {
      if (contact) {
        response.json(contact)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, phoneNumber } = request.body

  Contact.findById(request.params.id)
    .then(contact => {
      if (!contact) {
        return response.status(404).end()
      }

      contact.phoneNumber = phoneNumber

      return contact.save().then((updatedContact) => {
        response.json(updatedContact)
      })
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Contact.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})