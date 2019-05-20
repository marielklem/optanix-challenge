const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WordSchema = new Schema({
  key1 : {}
})

module.exports = mongoose.model('WordCount', WordSchema)