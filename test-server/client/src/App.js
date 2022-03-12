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
      .catch((err) => console.error(err.response.data.errMsg))
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

  function editMovie(updates, movieId) {
    axios
      .put(`/movies/${movieId}`, updates)
      .then((res) =>
        setMovies((prevMovies) =>
          prevMovies.map((movie) => (movie._id !== movieId ? movie : res.data))
        )
      )
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    getMovies()
  }, [])

  return (
    <div>
      <div className='movie-container'>
        <AddMovieForm submit={addMovie} btnText='Add Movie' />
        {movies.map((movie) => (
          <Movie
            {...movie}
            key={movie._id}
            editMovie={editMovie}
            deleteMovie={deleteMovie}
          />
        ))}
      </div>
    </div>
  )
}

export default App
