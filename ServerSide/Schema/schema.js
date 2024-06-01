const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    key: Number,
    name: String,
    email: String,
    profile: String,
    company: String,
    salary: Number,
})

module.exports = mongoose.model("Data", schema);