const request = require('supertest')
const express = require('express')

const app = express()

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' })
})

describe('Test the root path', () => {
  test('It should response the GET method', () => {
    let req = request(app)
    // console.log(req.get('/user'))
    return req
      .get('/user')
      .expect('Content-Type', /json/)
      .expect('Content-Length', '15')
      .expect(200)
  })
})
