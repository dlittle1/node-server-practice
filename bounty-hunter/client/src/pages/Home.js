import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AddBounty from '../components/AddBounty'

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
      <h1 className='text-gray-700 font-bold text-6xl bg-white w-min px-4 pb-4 rounded shadow text-center'>
        Bounties
      </h1>
      <div className='grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-5 mt-6 mx-3'>
        {bounties.map((bounty) => (
          <div key={bounty._id} className='p-4 bg-white rounded shadow'>
            <h1 className='text-gray-700 uppercase font-bold text-xl'>
              {bounty.firstName} {bounty.lastName}
            </h1>
            <h2 className='text-gray-700'>
              Living:{' '}
              <span className='text-green-600'>
                {bounty.living ? 'Alive' : 'Dead'}
              </span>
            </h2>
            <h2 className='text-gray-700'>
              Type: <span>{bounty.type}</span>
            </h2>
            <h2 className='text-gray-700'>
              Bounty Amount: <span>{bounty.bountyAmount}</span>
            </h2>
            <button
              onClick={(e) => handleDelete(e, bounty._id)}
              className='bg-red-500 hover:bg-red-700 font-bold py-2 px-4 mt-4 rounded text-white shadow-md'
            >
              Delete
            </button>
            <button
              onClick={() => {
                openAndCloseForm(bounty)
              }}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ml-3 shadow-lg active:shadow-sm'
            >
              Edit
            </button>
          </div>
        ))}
      </div>

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
