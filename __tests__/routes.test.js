const request = require('supertest')
let app = require('../src/Server/server')
const apiUrl = '/api/v1/'
let req = request('http://localhost:3001')
describe('Test the root path', () => {
  test('It should response the GET method', () => {
    console.log(req.get(apiUrl + 'books/1'))
    debugger
    return req.get(apiUrl).expect(200)
  })
})
// describe('Post Endpoints', () => {
//   it('get verses', async () => {
//     const res = await request(app).get(apiUrl + 'books/1')
//     expect(res.statusCode).toEqual(201)
//     expect(res.body).toHaveProperty('verses')
//   })
// })
