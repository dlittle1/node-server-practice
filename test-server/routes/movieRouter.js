const express = require('express')
const movieRouter = express.Router()
const { v4: uuidv4 } = require('uuid')

const movies = [
  { title: 'Die Hard', genre: 'action', _id: uuidv4() },
  { title: 'Star Wars', genre: 'fantasy', _id: uuidv4() },
  { title: 'Lion King', genre: 'fantasy', _id: uuidv4() },
  { title: 'Friday the 13th', genre: 'horror', _id: uuidv4() },
]

// get one
movieRouter.get('/:movieId', (req, res) => {
  const movieId = req.params.movieId

  const foundMovie = movies.find((movie) => movie._id === movieId)
  res.send(foundMovie)
})

// get genre
movieRouter.get('/search/genre', (req, res) => {
  const genre = req.query.genre

  const filteredMovies = movies.filter((movie) => movie.genre === genre)
  res.send(filteredMovies)
})

// post one
movieRouter.post('/', (req, res) => {
  const newMovie = req.body
  if (
    newMovie.title === undefined ||
    newMovie.genre === undefined ||
    newMovie.title === '' ||
    newMovie.genre === ''
  ) {
    res.status(400).send('Must Have Title and Genre')
  } else {
    newMovie._id = uuidv4()
    movies.push(newMovie)
    res.send(newMovie)
  }
})

// get all
movieRouter.get('/', (req, res) => {
  res.send(movies)
})

// delete
movieRouter.delete('/:movieId', (req, res) => {
  const movieId = req.params.movieId
  const movieIndex = movies.findIndex((movie) => movie._id === movieId)
  movies.splice(movieIndex, 1)
  res.send('Successfully deleted movie!')
})

movieRouter.put('/:movieId', (req, res) => {
  const movieId = req.params.movieId
  const updateObject = req.body
  const movieIndex = movies.findIndex((movie) => movie._id === movieId)
  const updatedMovie = Object.assign(movies[movieIndex], updateObject)
  res.send(updatedMovie)
})

module.exports = movieRouter
