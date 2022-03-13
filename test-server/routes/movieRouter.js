const express = require('express')
const movieRouter = express.Router()
const Movie = require('../models/movie')
// get one
movieRouter.get('/:movieId', (req, res, next) => {
  const movieId = req.params.movieId

  const foundMovie = movies.find((movie) => movie._id === movieId)
  if (!foundMovie) {
    const error = new Error(`The item with the id: ${movieId} was not found`)
    res.status(500)
    return next(error)
  }
  res.status(200).send(foundMovie)
})

// get genre
movieRouter.get('/search/genre', (req, res, next) => {
  Movie.find({ genre: req.query.genre }, (err, movies) => {
    if (err) {
      res.status(500)
      return next(err)
    }
    return res.status(200).send(movies)
  })
})

// post one
movieRouter.post('/', (req, res, next) => {
  const newMovie = new Movie(req.body)
  newMovie.save((err, savedMovie) => {
    if (err) {
      res.status(500)
      return next(err)
    }
    return res.status(200).send(savedMovie)
  })
})

// get all
movieRouter.get('/', (req, res, next) => {
  Movie.find((err, movies) => {
    if (err) {
      res.status(500)
      return next(err)
    }
    return res.status(200).send(movies)
  })
})

// delete
movieRouter.delete('/:movieId', (req, res) => {
  Movie.findOneAndDelete({ _id: req.params.movieId }, (err, deletedItem) => {
    if (err) {
      res.status(500)
      return next(err)
    }

    return res
      .status(200)
      .send(`successfully deleted item ${deletedItem.title}`)
  })
})

movieRouter.put('/:movieId', (req, res, next) => {
  Movie.findByIdAndUpdate(
    { _id: req.params.movieId },
    req.body,
    { new: true },
    (err, updatedMovie) => {
      if (err) {
        res.status(500)
        return next(err)
      }
      return res.status(200).send(updatedMovie)
    }
  )
})

module.exports = movieRouter
