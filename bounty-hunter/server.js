const express = require('express')
const app = express()
const { v4: uuidv4 } = require('uuid')

app.use(express.json())

const bounties = [
  {
    firstName: 'bob',
    lastName: 'dylan',
    living: true,
    bountyAmount: 1000,
    type: 'Jedi',
    _id: uuidv4,
  },
  {
    firstName: 'sammy',
    lastName: 'hill',
    living: false,
    bountyAmount: 500,
    type: 'Jedi',
    _id: uuidv4,
  },
  {
    firstName: 'Rocky',
    lastName: 'Balboa',
    living: false,
    bountyAmount: 1500,
    type: 'Sith',
    _id: uuidv4,
  },
  {
    firstName: 'Arnold',
    lastName: 'Schwarzenegger',
    living: true,
    bountyAmount: 3000,
    type: 'Sith',
    _id: uuidv4,
  },
  {
    firstName: 'Elon',
    lastName: 'Musk',
    living: true,
    bountyAmount: 5000,
    type: 'Jedi',
    _id: uuidv4,
  },
]

app.get('/', (req, res) => {
  res.send(bounties)
})

app.post('/', (req, res) => {
  const newBounty = req.body
  newBounty._id = uuidv4()
  bounties.push(newBounty)
  res.send(
    `successfully added ${
      newBounty.firstName + ' ' + newBounty.lastName
    } to the list!`
  )
})

app.listen(9000, () => {
  console.log('The server is running on localhost:9000')
})
