const Restaurant = require('../restaurant')
const restaurantList = require('./restaurants.json')
const db = require('../../config/mongoose')

db.once('open', () => {
  for (let i = 0; i < restaurantList.results.length; i++) {
    Restaurant.create(restaurantList.results[i])
  }
  console.log('done!')
})