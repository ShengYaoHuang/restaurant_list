const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const session = require('express-session')
const methodOverride = require('method-override')
const routes = require('./routes')
const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(session({
  secret: 'ThisIsRestaurantSecret',
  resave: false,
  saveUninitialized: true
}))

usePassport(app)

app.use(routes)

app.listen(3000, () => {
  console.log(`Express is listening on localhost:3000`)
})