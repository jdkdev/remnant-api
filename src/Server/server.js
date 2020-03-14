const helmet = require('helmet')
const cors = require('cors')

let server = require('express')()
let router = require('./router')

server.use(cors())
server.use(helmet())
server.use(helmet.hidePoweredBy({ setTo: 'PHP 3.3.0' }))

server.use('/api/v1', router)
module.exports = server
