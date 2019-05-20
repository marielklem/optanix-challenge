const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LetterSchema = new Schema({
  key2 : {}
})

module.exports = mongoose.model('LetterCount', LetterSchema)