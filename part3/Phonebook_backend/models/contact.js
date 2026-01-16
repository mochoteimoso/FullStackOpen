const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url, { family: 4 })

  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Name must have at least three characters'],
    required: [true, 'Name required']
  },
  phoneNumber: {
    type: String,
    minLength: [8, 'Not a valid phone number, minimum length is 8'],
    validate: {
      validator: function(v) {
        return /\d{2,3}-\d{4,}$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number`
    },
    required: [true, 'Phone number required']
  }
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
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

  contact.save().then(() => {
    console.log(`added ${name} ${phoneNumber} to phonebook`)
    mongoose.connection.close()
  })
}


module.exports = mongoose.model('Contact', contactSchema)