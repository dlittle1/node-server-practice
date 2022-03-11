import React, { useEffect, useState } from 'react'

const AddBounty = (props) => {
  const { editBounty } = props

  const [newBounty, setNewBounty] = useState({
    firstName: '',
    lastName: '',
    living: true,
    type: 'Jedi',
    bountyAmount: '',
  })

  useEffect(() => {
    if (editBounty.firstName) {
      setNewBounty(editBounty)
    }
  }, [])

  function handleChange(e) {
    let { name, value } = e.target
    if (value === 'true') {
      value = true
    } else if (value === 'false') {
      value = false
    }
    setNewBounty((prevBounty) => ({ ...prevBounty, [name]: value }))
    console.log(name, value)
  }

  return (
    <form
      onSubmit={
        editBounty.firstName
          ? (e) => props.handleEdit(e, newBounty)
          : (e) => props.handleSubmit(e, newBounty)
      }
      className='my-10 bg-white shadow-2xl shadow-slate-800 p-8 rounded form'
    >
      <div className='text-center uppercase font-bold text-gray-700 mb-6'>
        Create New Bounty
      </div>
      <div className='flex flex-wrap mb-6'>
        <div className='md:w-1/2 px-3'>
          <label
            htmlFor='firstName'
            className='block text-gray-700 text-sm font-bold mb-2'
          >
            First Name
          </label>
          <input
            type='text'
            name='firstName'
            value={newBounty.firstName}
            placeholder='First Name...'
            onChange={handleChange}
            className='shadow block w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <div className='md:w-1/2 mt-4 md:mt-0 px-3'>
          <label
            htmlFor='lastName'
            className=' block text-gray-700 text-sm font-bold mb-2'
          >
            Last Name
          </label>
          <input
            type='text'
            name='lastName'
            value={newBounty.lastName}
            placeholder='Last Name...'
            onChange={handleChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
      </div>
      <div className='px-3 md:w-1/2'>
        <label
          htmlFor='bountyAmount'
          className='block text-gray-700 text-sm font-bold mb-2 mt-4'
        >
          Bounty Amount
        </label>
        <input
          type='text'
          name='bountyAmount'
          value={newBounty.bountyAmount}
          placeholder='Bounty Amount...'
          onChange={handleChange}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        />
      </div>
      <div className='px-4 flex'>
        <div className='mr-5'>
          <div className='mt-5'>
            <input
              type='radio'
              value={true}
              name='living'
              checked={newBounty.living}
              onChange={handleChange}
            />
            <span className='mr-6 ml-1 text-gray-700 text-sm font-bold '>
              Living
            </span>
            <input
              type='radio'
              value={false}
              name='living'
              checked={!newBounty.living}
              onChange={handleChange}
            />
            <span className='ml-1 text-gray-700 text-sm font-bold'>Dead</span>
          </div>
        </div>
        <div className='ml-5'>
          <div className='mt-5'>
            <input
              type='radio'
              value='Jedi'
              name='type'
              checked={newBounty.type === 'Jedi'}
              onChange={handleChange}
            />
            <span className='mr-5 ml-1 text-gray-700 text-sm font-bold'>
              Jedi
            </span>
            <input
              type='radio'
              value='Sith'
              name='type'
              checked={newBounty.type === 'Sith'}
              onChange={handleChange}
            />
            <span className='ml-1 text-gray-700 text-sm font-bold'>Sith</span>
          </div>
        </div>
      </div>

      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ml-3'>
        Create Bounty
      </button>
      <button
        onClick={props.openAndCloseForm}
        className='bg-red-500 hover:bg-red-700 active:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 ml-3'
        type='button'
      >
        Cancel
      </button>
    </form>
  )
}

export default AddBounty
