const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

const mainRoutes = require('./routes')
app.use('/', mainRoutes)

app.listen(8000, () => {
  console.log('Node.js listening on port ' + 8000)
})

module.exports =  app