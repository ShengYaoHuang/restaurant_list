const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const session = require('express-session')
const flash = require('connect-flash')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const methodOverride = require('method-override')
const routes = require('./routes')
const usePassport = require('./config/passport')
require('./config/mongoose')


const PORT = process.env.PORT
const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is listening on localhost:${PORT}`)
})