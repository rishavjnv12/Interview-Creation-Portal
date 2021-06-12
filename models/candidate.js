const mongoose = require('mongoose')

const CandidateSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    }
})
const model = mongoose.model('CandidateModel', CandidateSchema)
module.exports = model