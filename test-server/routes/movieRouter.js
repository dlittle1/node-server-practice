const express = require('express')
const movieRouter = express.Router()
const { v4: uuidv4 } = require('uuid')

const movies = [
  { title: 'die hard', genre: 'action', _id: uuidv4() },
  { title: 'Star Wars', genre: 'fantasy', _id: uuidv4() },
  { title: 'lion king', genre: 'fantasy', _id: uuidv4() },
  { title: 'friday the 13th', genre: 'horror', _id: uuidv4() },
]

movieRouter.get('/:movieId', (req, res) => {
  const movieId = req.params.movieId

  const foundMovie = movies.find((movie) => movie._id === movieId)
  res.send(foundMovie)
})

movieRouter.post('/', (req, res) => {
  const newMovie = req.body
  newMovie._id = uuidv4()
  movies.push(newMovie)
  res.send(`Successfully added ${newMovie.title} to the database`)
})

movieRouter.get('/', (req, res) => {
  res.send(movies)
})

// movieRouter
//   .route('/')
//   .get((req, res) => {
//     res.send(movies)
//   })
//   .post((req, res) => {
//     const newMovie = req.body
//     newMovie._id = uuidv4()
//     movies.push(newMovie)
//     res.send(`Successfully added ${newMovie.title} to the database`)
//   })

module.exports = movieRouter
