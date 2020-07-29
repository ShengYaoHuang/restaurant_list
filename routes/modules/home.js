const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find({ name: { $regex: keyword, $options: "i" } })
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
  const key = req.params.key
  const value = req.params.value
  return Restaurant.find()
    .lean()
    .sort({ [key]: value })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))

})


module.exports = router