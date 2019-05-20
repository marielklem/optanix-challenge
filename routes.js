const router = require('express').Router()

//POST Word Count per Sentence
router.post('/word', (req, res) => {
  //find user provided key from request
  var key = Object.keys(req.body)
  //break up each sentence with period, question mark or exclamation point
  const sentence = req.body[key].split(/[.!?]/g)
  let word_count_per_sentence = {
    [key] : {}
  }
  sentence.forEach(item => {
    //remove leading white space for each item
    const word = item.trim()
    let wordCount = word.split(" ").length
    word_count_per_sentence[key] = {
      ...word_count_per_sentence[key],
      [word] : wordCount
    }
  })
  res.send(word_count_per_sentence)
})


//POST Letter Count
router.post('/letter', (req, res) => {
  const key = Object.keys(req.body)
  //remove all spaces and characters from string and make all letters lowercase
  const newSentence = req.body[key].replace(/[^A-Za-z]/g, '').toLowerCase()
  //count each occurance of each letter
  let total_letter_count = {
    [key]: {}
  }
  for (let i=0; i < newSentence.length; i++) {
    let letter = newSentence.charAt(i);
    if (total_letter_count[key][letter]) {
      total_letter_count[key][letter]++;
    } else {
      total_letter_count[key][letter] = 1
    }
  }
  res.send(total_letter_count)

})

module.exports = router