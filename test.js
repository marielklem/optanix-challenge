let chai = require('chai')
let { expect } = require('chai');
let chaiHttp = require('chai-http');
let server = require('./server')

chai.use(chaiHttp)

describe('the API', () => {
  describe('/POST /word', () => {
    it ("should split up sentences by period, question mark and exclimation point", done => {
      chai
        .request(server)
        .post('/word')
        .send({"key1":"this was the sentence? this was another sentence! Here's one for good measure."})
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body.key1).to.be.an('object')
          expect(response.body).to.have.property('key1')
          expect(response.body.key1).to.have.property("Here's one for good measure")
          done();
          })
    })
    it ("should count total number of words in each sentence", done => {
      chai
        .request(server)
        .post('/word')
        .send({"key1":"small-sentence? Here's one for good measure."})
        .end((error, response) => {
          //count total number of words
          expect(response.body.key1).to.have.property("Here's one for good measure").to.equal(5)
          //only count spaces as words, not other characters
          expect(response.body.key1).to.have.property("small-sentence").to.equal(1)
          done();
          })
    })
    it ("should return error if not a valid object", done => {
      chai
        .request(server)
        .post('/word')
        .send({"key1":null})
        .end((error, response) => {
          expect(response).to.have.status(500)
          done();
          })
    })
  })
  describe('/POST /letter', () => {
    it ("return an object with user specified key", done => {
      chai
        .request(server)
        .post('/letter')
        .send({"another key":"this was the sentence"})
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.have.property('another key')
          done();
          })
    })
    it ("should not allow capital letters to provide duplicates", done => {
      chai
        .request(server)
        .post('/letter')
        .send({"key1":"ThIs iS a cRazY sEntEnce"})
        .end((error, response) => {
          expect(response.body.key1).to.not.have.property('R')
          expect(response.body.key1).to.have.property('e').to.equal(3)
          done();
          })
    })
    it ("should only count case-insensitive letters", done => {
      chai
        .request(server)
        .post('/letter')
        .send({"key1":"ThIs i$ @ cR@zY sEntEnce"})
        .end((error, response) => {
          expect(response.body.key1).to.not.have.property('@')
          done();
          })
    })
  })
});
