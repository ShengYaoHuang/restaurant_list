const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

router.get('/search', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword
  Restaurant.find({ name: { $regex: keyword, $options: "i" }, userId })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

router.get('/sort/:key/:value', (req, res) => {
  const selectSort = {
    nameAsc: 'A -> Z',
    nameDesc: 'Z -> A',
    category: '類別',
    location: '地區'
  }
  const userId = req.user._id
  const key = req.params.key
  const value = req.params.value
  return Restaurant.find({ userId })
    .lean()
    .sort({ [key]: value })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))

})


module.exports = router