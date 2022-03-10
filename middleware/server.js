const express = require('express')
const middleware = require('./middleware')
const app = express()

const object = { title: 'Hello World', subtitle: 'I am Dylan' }

app.use('/', middleware.addToReq)

app.get('/', (req, res, next) => {
  const readMessage = [object, req.body]
  res.send(readMessage)
})

app.listen(9000, () => {
  console.log('server is running on port 9000')
})
