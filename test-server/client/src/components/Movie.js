import { useState } from 'react'

import AddMovieForm from './AddMovieForm'

export default function Movie(props) {
  const { title, genre, _id } = props
  const [editToggle, setEditToggle] = useState(false)
  return (
    <div className='movie'>
      {!editToggle ? (
        <>
          <h1>{title}</h1>
          <p>Genre: {genre}</p>
          <button className='delete-btn' onClick={() => props.deleteMovie(_id)}>
            Delete
          </button>
          <button
            className='edit-btn'
            onClick={() => setEditToggle((prevToggle) => !prevToggle)}
          >
            Edit
          </button>
        </>
      ) : (
        <>
          <AddMovieForm
            title={title}
            genre={genre}
            btnText='Submit Edit'
            submit={props.editMovie}
            _id={_id}
          />
          <button onClick={() => setEditToggle((prevToggle) => !prevToggle)}>
            Close
          </button>
        </>
      )}
    </div>
  )
}
