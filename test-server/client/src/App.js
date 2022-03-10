import { useState, useEffect } from 'react'
import axios from 'axios'
import Movie from './components/Movie'
import AddMovieForm from './components/AddMovieForm'

function App() {
  const [movies, setMovies] = useState([])

  function getMovies() {
    axios
      .get('/movies')
      .then((res) => setMovies(res.data))
      .catch((err) => console.error(err))
  }

  function addMovie(newMovie) {
    axios
      .post('/movies', newMovie)
      .then((res) => setMovies((prevMovies) => [...prevMovies, res.data]))
      .catch((err) => console.error(err))
  }

  console.log(movies)

  function deleteMovie(movieId) {
    axios
      .delete(`/movies/${movieId}`)
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
    setMovies((prevMovies) =>
      prevMovies.filter((movie) => movie._id !== movieId)
    )
  }

  useEffect(() => {
    getMovies()
  }, [])

  return (
    <div>
      <div className='movie-container'>
        <AddMovieForm addMovie={addMovie} />
        {movies.map((movie) => (
          <Movie {...movie} key={movie._id} deleteMovie={deleteMovie} />
        ))}
      </div>
    </div>
  )
}

export default App
