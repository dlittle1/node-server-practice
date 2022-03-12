const express = require('express')
const app = express()
const morgan = require('morgan')

// Middleware
app.use(express.json()) // looks for a request body, and turns it into 'req.body'
app.use(morgan('dev'))

app.use('/movies', require('./routes/movieRouter.js'))

app.use('/tvshows', require('./routes/tvshowRouter'))

// Error handling
app.use((err, req, res, next) => {
  console.log(err)
  return res.send({ errMsg: err.message })
})

app.listen(9000, () => {
  console.log('The server is running on localhost:9000')
})
