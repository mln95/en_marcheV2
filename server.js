const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const app = express()
const expressLayouts = require('express-ejs-layouts')

const database = require('./config/database')
const flash = require('express-flash')

const dbString = process.env.DATA_BASE_URL;
const dbOptions = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
};

const connection = mongoose.createConnection(dbString, dbOptions);
connection.then(()=>{
 console.log('Successfully connected to the mongoDB Atlas session!')
}).catch((error)=>{
    console.log('impossible to connect to the mondoDB Atlas session!')
    console.error(error);
});

const indexRouter = require('./routes/index')

app.set('view engine','ejs')
app.set('views',__dirname + '/views')
app.set('layout','layouts/layout')

app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({limit: '10mb', extended: true}))

const sessionStore = new MongoStore({
    mongooseConnection: connection,
    collection: 'sessions'
});

app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))



app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)