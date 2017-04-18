const express = require('express')
const morgan = require('morgan')
const api = require('./api')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.use('/', express.static('assets'))


app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

const requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  // setTimeout(next, 1000)
  next()
}

app.use('/api', api)

app.use(requestTime)

const arr = require('./mock/data')

app.get('/', (req, res) => {
  console.log('req.requestTime : ', req.requestTime)
  console.log((Date.now() - req.requestTime) / 1000)
  res.render('index.ejs', {candidats: arr, salutation: 'Coucou'})
})

app.get('/toto', (req, res) => {
  res.send('j\'ai une histoire à vous raconter')
})

app.get('/tata', (req, res) => {
  res.send('j\'ai un gateau pour toi')
})

app.get('/*', (req, res) => {
  res.status(404).send('page non-trouvée')
})

app.listen('3000', (err) => {
  if (err) {
    throw new Error('le server n\'a pas demarré')
  }

  console.log('OK, le server est demarré sur le port 3000')
})
