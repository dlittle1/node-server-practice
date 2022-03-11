const express = require('express')
const bountiesRouter = express.Router()
const { v4: uuidv4 } = require('uuid')

const bounties = [
  {
    firstName: 'bob',
    lastName: 'dylan',
    living: true,
    bountyAmount: 1000,
    type: 'Jedi',
    _id: uuidv4(),
  },
  {
    firstName: 'sammy',
    lastName: 'hill',
    living: false,
    bountyAmount: 500,
    type: 'Jedi',
    _id: uuidv4(),
  },
  {
    firstName: 'Rocky',
    lastName: 'Balboa',
    living: false,
    bountyAmount: 1500,
    type: 'Sith',
    _id: uuidv4(),
  },
  {
    firstName: 'Arnold',
    lastName: 'Schwarzenegger',
    living: true,
    bountyAmount: 3000,
    type: 'Sith',
    _id: uuidv4(),
  },
  {
    firstName: 'Elon',
    lastName: 'Musk',
    living: true,
    bountyAmount: 5000,
    type: 'Jedi',
    _id: uuidv4(),
  },
]

bountiesRouter.get('/', (req, res) => {
  res.send(bounties)
})

bountiesRouter.get('/:bountyId', (req, res) => {
  const bountyId = req.params.bountyId
  const filteredBounty = bounties.filter((bounty) => bounty._id === bountyId)
  res.send(filteredBounty)
})

bountiesRouter.post('/', (req, res) => {
  const newBounty = req.body
  newBounty._id = uuidv4()
  bounties.push(newBounty)
  res.send(newBounty)
})

bountiesRouter.put('/:bountyId', (req, res) => {
  const bountyId = req.params.bountyId
  const updateObject = req.body
  const bountyIndex = bounties.findIndex((bounty) => bounty._id === bountyId)
  const updatedBounty = Object.assign(bounties[bountyIndex], updateObject)
  res.send(updatedBounty)
})

bountiesRouter.delete('/:bountyId', (req, res) => {
  const bountyId = req.params.bountyId
  const bountyIndex = bounties.findIndex((bounty) => bounty._id === bountyId)
  bounties.splice(bountyIndex, 1)
  res.send('successfully removed bounty')
})

module.exports = bountiesRouter
