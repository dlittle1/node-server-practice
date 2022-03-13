const express = require('express')
const res = require('express/lib/response')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

app.use(express.json())
app.use(morgan('dev'))

mongoose.connect('mongodb://localhost:27017/bountyhunter', () =>
  console.log('connected to database')
)

app.use('/bounties', require('./bounties'))

app.use((err, req, res, next) => {
  console.log(err)
  return res.send({ errorMessage: err.message })
})

app.listen(9000, () => {
  console.log('The server is running on localhost:9000')
})
