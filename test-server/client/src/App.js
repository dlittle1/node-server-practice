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
  }

  useEffect(() => {
    getMovies()
  }, [])

  return (
    <div>
      <div className='movie-container'>
        <AddMovieForm addMovie={addMovie} />
        {movies.map((movie) => (
          <Movie {...movie} key={movie._id} />
        ))}
      </div>
    </div>
  )
}

export default App
