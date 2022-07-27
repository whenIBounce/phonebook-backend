const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

mongoose
  .connect(url)
  .then((res) => console.log('connected to db'))
  .catch((err) => console.log(err))

const personSchema = new mongoose.Schema({
	name: {
		type: String, 
		minLength: 3, 
		required: true,  
	},
	number: {
		type: String,
		validate: {
			validator: function(v) {
			  return /^\d{2,3}-\d{4,}$/.test(v);
			},
			message: props => `${props.value} is not a valid phone number!`
		  },
		  required: [true, 'User phone number required'],minLength: [8, 'Phone Number has at least 8 integers']
	}
})

personSchema.set('toJSON', {
	transform:(document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})


const Person = mongoose.model('Person', personSchema)
module.exports = Person