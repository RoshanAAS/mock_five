


const mongoose = require('mongoose')

const userSchema = mongoose.Schema({


    first_Name: String,
    last_Name: String,
    email: String,
    department: String,
    salary: Number

}, {
    versionKey: false
})

const EmpModel = mongoose.model('employee', userSchema)

module.exports = { EmpModel }