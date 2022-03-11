import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AddBounty from '../components/AddBounty'
import Bounties from '../components/Bounties'

const Home = () => {
  const [bounties, setBounties] = useState([])
  const [formClosed, setFormClosed] = useState(false)
  const [bountyToEdit, setBountyToEdit] = useState({})

  useEffect(() => {
    axios
      .get('/bounties')
      .then((res) => setBounties(res.data))
      .catch((err) => console.error(err))
  }, [])

  function handleSubmit(e, newBounty) {
    e.preventDefault()
    axios
      .post('/bounties', newBounty)
      .then((res) => setBounties((prevBounties) => [...prevBounties, res.data]))
      .catch((err) => console.error(err))
    openAndCloseForm()
  }

  function handleDelete(e, bountyId) {
    axios
      .delete(`/bounties/${bountyId}`)
      .then((res) =>
        setBounties((prevBounties) =>
          prevBounties.filter((bounty) => bounty._id !== bountyId)
        )
      )
  }

  function handleEdit(e, updatedBounty) {
    e.preventDefault()
    console.log(updatedBounty)
    axios
      .put(`/bounties/${updatedBounty._id}`, updatedBounty)
      .then((res) =>
        setBounties((prevBounties) =>
          prevBounties.map((bounty) =>
            bounty._id === updatedBounty._id ? updatedBounty : bounty
          )
        )
      )
      .catch((err) => console.error(err))
    openAndCloseForm()
  }

  function openAndCloseForm(bounty) {
    if (bounty) {
      setBountyToEdit(bounty)
    }
    setFormClosed((prevState) => !prevState)
  }

  console.log(bounties)
  return (
    <div className='relative'>
      {formClosed && (
        <AddBounty
          handleSubmit={handleSubmit}
          openAndCloseForm={openAndCloseForm}
          editBounty={bountyToEdit}
          handleEdit={handleEdit}
        />
      )}
      <Bounties
        handleDelete={handleDelete}
        openAndCloseForm={openAndCloseForm}
        bounties={bounties}
      />
      <button
        onClick={openAndCloseForm}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ml-3 shadow-lg active:shadow-sm'
      >
        Add New Bounty
      </button>
    </div>
  )
}

export default Home
