const express = require('express')
const res = require('express/lib/response')
const app = express()
const morgan = require('morgan')

app.use(express.json())
app.use(morgan('dev'))

app.use('/bounties', require('./bounties'))

app.use((err, req, res, next) => {
  console.log(err)
  return res.send({ errorMessage: err.message })
})

app.listen(9000, () => {
  console.log('The server is running on localhost:9000')
})
