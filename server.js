const express = require('express')
const app = express()
const PORT = 8500
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config()

//VIEW DIRECTORY AS ROOT
app.set('views', path.join(__dirname, 'views'))

//EJS AS TEMPLATE ENGINE
app.set('view engine', 'ejs')
app.use(express.static('public'))

//setting extended as true allows us to pass an array
app.use(express.urlencoded({extended: true}))

//HIVE SCHEMA
const Hive = require('./models/hive')

//DB connection
mongoose.connect(process.env.DB_STRING,
    {useNewUrlParser: true},
    () => {console.log('Connected to HiveNotes database!')}
)

//ALL HIVES
app.get('/hives', async (req, res) => {
    const hives = await Hive.find({})
    res.render('hives', { hives })
})

//SERVE THE NEW HIVE FORM
app.get('/hives/new', (req, res) => {
    res.render('newHive')
})

//ADD A NEW HIVE
app.post('/hives', async (req, res) => {
    const newHive = new Hive(req.body)
    await newHive.save()
    res.redirect('/hives')
})

//SERVE FORM FOR HIVE EDIT
app.get('/hives/:id/edit', async (req, res) => {

})

//ACTIVATE PORT
app.listen(process.env.PORT || PORT, ()=> {
    console.log(`server running on ${process.env.PORT || PORT}`)
})
