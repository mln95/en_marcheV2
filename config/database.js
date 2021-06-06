const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const data_base = mongoose.connect(process.env.DATA_BASE_URL , {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() =>{
    console.log('connected to the database')
}).catch((err) => {
    console.log(err)
})

module.exports = data_base