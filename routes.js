const router = require('express').Router()

//POST Word Count per Sentence
router.post('/word', (req, res) => {
  //find user provided key from request

  //break up each sentence with period, question mark or exclamation point

  //remove leading white space for each item

  //return object with key and sentences

})


//POST Letter Count
router.post('/letter', (req, res) => {

  //remove all spaces and characters from string
  
  //make all letters lowercase

  //count each occurance of each letter

  //return object with key and letter count

})

module.exports = router