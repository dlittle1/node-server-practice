const express = require('express')
const req = require('express/lib/request')
const carsRouter = express.Router()
const { v4: uuidv4 } = require('uuid')

const cars = [
  { make: 'Toyota', model: '4Runner', bodyType: 'SUV' },
  { make: 'Audi', model: 'A4', bodyType: 'Sedan' },
  { make: 'Ford', model: 'F-150', bodyType: 'Truck' },
  { make: 'Toyota', model: 'RAV4', bodyType: 'SUV' },
  { make: 'Porsche', model: 'Macan', bodyType: 'SUV' },
  { make: 'Volkswagen', model: 'Golf GTI', bodyType: 'Hatchback' },
  { make: 'Honda', model: 'Civic', bodyType: 'Sedan' },
]

carsRouter.get('/', (req, res) => {
  const filter = req.query
  const haveFilters = Object.keys(filter).length
  const filteredCars = cars.filter((car) => {
    for (let key in filter) {
      if (car[key] !== filter[key]) return false
    }
    return true
  })

  res.send(haveFilters ? filteredCars : cars)
})

carsRouter.get('/')

module.exports = carsRouter
