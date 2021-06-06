const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const database = require('./config/database')

const indexRouter = require('./routes/index')

app.set('view engine','ejs')
app.set('views',__dirname + '/views')
app.set('layout','layouts/layout')

app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({limit: '10mb', extended: true}))

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)