const mongoose = require('mongoose')

const InterviewSchema = new mongoose.Schema({
    date:Date,
    startTime:String,
    endTime:String,
    userName:String
})
const model = mongoose.model('interviewModel', InterviewSchema)
module.exports = model

