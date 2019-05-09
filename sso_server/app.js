const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const config = require('./config')
const port = process.env.PORT || 3000 
const app = express()


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// 콘솔에 로그보이기
app.use(morgan('dev'))

// 시크릿 키 주입
app.set('jwt-secret', config.secret)


app.get('/', (req, res) => {
    res.send('Hello JWT')
})

// open the server
app.listen(port, () => {
    console.log(`Express is running on port ${port}`)
})



// 몽고디비 연결
mongoose.connect(config.mongodbUri)
const db = mongoose.connection
db.on('error', console.error)
db.once('open', ()=>{
    console.log('connected to mongodb server')
})