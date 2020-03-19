//register, login, logout, refreshtokens, verify
let express = require('express')
let router = express.Router()

const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.use('/', (req, res, next) => {
  // console.log({body: req.body})
  next()
})

let UserController = require('$c/UserController')
let BibleController = require('$c/BibleController')

let AuthController = require('$c/AuthController')
let atm = AuthController.authenticateTokenMiddleware

router.get('/test', atm, BibleController.test)
router.get('/study', atm, BibleController.index)
// router.get('/study/:book_id', BibleController.show)
router.get('/books/indices', atm, BibleController.indices)
router.get('/books/:book_id', atm, BibleController.show)
router.get('/verses/:id', atm, BibleController.verse)
router.get('/search/:searchTerm', atm, BibleController.search)

router.get('/users', atm, UserController.index)
router.get('/users/all', atm, UserController.all)

// router.post('/users', UserController.store)
// router.delete('/users/:id', UserController.destroy)
// router.patch('/users/:id/restore', UserController.restore)

// router.post('/register', AuthController.register)
// router.post('/login', AuthController.login)
// router.post('/refresh', AuthController.refresh)
// router.get(
//   '/verify',
//   AuthController.authenticateTokenMiddleware,
//   AuthController.verify
// )
// router.post('/logout', AuthController.logout)

module.exports = router
