const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${encodeURIComponent(password)}@cluster0.0gw8ava.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const contactSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length === 3) {
  console.log('phonebook:')
  Contact.find({}).then(result => {
    result.forEach(contact => {
      console.log(contact.name, contact.phoneNumber)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length > 3 && process.argv.length < 6) {
  const name = process.argv[3]
  const phoneNumber = process.argv[4]

  const contact = new Contact({
    name: name,
    phoneNumber: phoneNumber,
  })

  contact.save().then(result => {
    console.log(`added ${name} ${phoneNumber} to phonebook`)
    mongoose.connection.close()
  })
}