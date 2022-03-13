const express = require('express')
const bountiesRouter = express.Router()
const Bounty = require('./models/bounty')

bountiesRouter.get('/', (req, res, next) => {
  Bounty.find((err, bounties) => {
    if (err) {
      res.status(500)
      return next(err)
    }
    return res.status(200).send(bounties)
  })
})

bountiesRouter.get('/:bountyId', (req, res, next) => {
  Bounty.findById({ _id: req.params.bountyId }, (err, bounty) => {
    if (err) {
      res.status(500)
      return next(err)
    }
    return res.status(200).send(bounty)
  })
})

bountiesRouter.post('/', (req, res, next) => {
  const newBounty = new Bounty(req.body)
  newBounty.save((err, savedBounty) => {
    if (err) {
      res.status(500)
      return next(err)
    }
    return res.status(200).send(savedBounty)
  })
})

bountiesRouter.put('/:bountyId', (req, res, next) => {
  Bounty.findByIdAndUpdate(
    { _id: req.params.bountyId },
    req.body,
    { new: true },
    (err, updatedBounty) => {
      if (err) {
        res.status(500)
        return next(err)
      }
      return res.status(200).send(updatedBounty)
    }
  )
})

bountiesRouter.delete('/:bountyId', (req, res, next) => {
  Bounty.findByIdAndDelete(
    { _id: req.params.bountyId },
    (err, deletedBounty) => {
      if (err) {
        res.status(500)
        return next(err)
      }
      return res
        .status(200)
        .send(`Successfully removed ${deletedBounty.firstName}'s bounty.`)
    }
  )
})

module.exports = bountiesRouter
