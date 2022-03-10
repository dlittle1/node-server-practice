import React, { useState } from 'react'

const AddMovieForm = (props) => {
  const initInputs = { title: props.title || '', genre: props.genre || '' }
  const [inputs, setInputs] = useState(initInputs)

  function handleChange(e) {
    const { name, value } = e.target
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    props.submit(inputs, props._id)
    setInputs(initInputs)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='title'
        value={inputs.title}
        onChange={handleChange}
        placeholder='Title'
      ></input>
      <input
        type='text'
        name='genre'
        value={inputs.genre}
        onChange={handleChange}
        placeholder='Genre'
      ></input>
      <button>{props.btnText}</button>
    </form>
  )
}

export default AddMovieForm
