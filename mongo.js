//This file is not related to the phonebook project
//We use this as a practice file to familiar with mongoose
const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log(
        'Please provide the password as an argument: node mongo.js <password>'
    )
    process.exit(1)
}
const password = process.argv[2]
const url = `mongodb+srv://hugu:${password}@cluster0.illhhzj.mongodb.net/phonebook?retryWrites=true&w=majority`
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})
const Person = mongoose.model('Person', personSchema)

mongoose
    .connect(url)
    .then((result) => {
        console.log('connected to db successfully')
        return result
    })
    .then(() => {
        if (process.argv.length === 3) {
            return Person.find({}).then((response) => {
                console.log('phonebook:')
                response.forEach((element) =>
                    console.log(`${element.name} ${element.number}`)
                )
            })
        }else if (process.argv.length === 5) {
            const new_name = process.argv[3]
            const new_number = process.argv[4]

            const person = Person({
                name: new_name,
                number: new_number,
            })

            return person.save().then((response) => {
                console.log(
                    `added ${response.name} number ${response.number} to phonebook`
                )
            }
            )
        }
    })
    .then(() => mongoose.connection.close())
    .catch((err) => console.log(err))
