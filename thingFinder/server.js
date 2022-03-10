const express = require('express')
const app = express()

app.use(express.json())

app.use('/cars', require('./cars/carsRouter.js'))

app.listen(9000, () => {
  console.log('app is running on port 9000')
})
