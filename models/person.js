const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
  })

personSchema.set('toJSON', {
	transform:(document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

mongoose
  .connect(url)
  .then((res) => console.log('connected to db'))
  .catch((err) => console.log(err))

module.exports = mongoose.model('Person', personSchema)