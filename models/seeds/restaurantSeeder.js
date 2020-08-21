const Restaurant = require('../restaurant')
const restaurantList = require('./restaurants.json')
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const User = require('../user')

const SEED_USER = [{
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
},
{
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678'
}]

db.once('open', () => {
  Promise.all(Array.from(
    { length: 2 },
    (_, i) => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(SEED_USER[i].password, salt))
        .then(hash =>
          User.create({
            name: SEED_USER[i].name,
            email: SEED_USER[i].email,
            password: hash
          }))
        .then(user => {
          const userId = user._id
          const list = []
          restaurantList.results.forEach((restaurant, index) => {
            if (user.name === 'user1') {
              if (index < 3) {
                list.push(restaurant)
              }
            }
            if (user.name === 'user2') {
              if (index >= 3 && index < 6) {
                list.push(restaurant)
              }
            }
          })
          return { list, userId }
        })
        .then(list => {
          return Promise.all(Array.from(
            { length: 3 },
            (_, i) => Restaurant.create({
              name: list.list[i].name,
              name_en: list.list[i].name_en,
              category: list.list[i].category,
              image: list.list[i].image,
              location: list.list[i].location,
              phone: list.list[i].phone,
              google_map: list.list[i].google_map,
              rating: list.list[i].rating,
              description: list.list[i].description,
              userId: list.userId
            })
          ))
        })
        .then(() => {
          console.log('done.')
          process.exit()
        })
    }
  ))
})