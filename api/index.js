const express = require('express')
const bodyParser = require('body-parser')
let candidats = require('../mock/data')

const router = express.Router()

router.use(bodyParser.json())

// router.use(bodyParser.json())
// router.use(bodyParser.urlencoded({ extended: true }))

router.get('/candidats', (req, res) => {
  res.json(candidats)
})

router.post('/candidats', (req, res) => {

  console.log('req.body : ', req.body)
  const name = req.body.name

  if (name) {
    candidats = [...candidats, {name}]
  }

  res.json(candidats)
})

module.exports = router
