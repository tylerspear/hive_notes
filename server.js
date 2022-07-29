// ********* GLOBALS *********
const express = require('express')
const app = express()
const PORT = 8500
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
require('dotenv').config()


// ********* MIDDLEWARE *********
//VIEW DIRECTORY AS ROOT
app.set('views', path.join(__dirname, 'views'))
//EJS AS TEMPLATE ENGINE
app.set('view engine', 'ejs')

app.use(express.static('public'))
//OVERRIDE METHOD FOR PUT REQUESTS
app.use(methodOverride('_method'))
//setting extended as true allows us to pass an array
app.use(express.urlencoded({extended: true}))


// ********* DATABASE *********
//HIVE SCHEMA
const Hive = require('./models/hive')
//DB connection
mongoose.connect(process.env.DB_STRING,
    {useNewUrlParser: true},
    () => {console.log('Connected to HiveNotes database!')}
)


// ********* ROUTES *********
//HOME
app.get('/', (req, res) => {
    res.render('index')
})

//ALL HIVES
app.get('/hives', async (req, res) => {
    const hives = await Hive.find({})
    res.render('hives/hiveIndex', { hives })
})

//SERVE THE NEW HIVE FORM
app.get('/hives/new', (req, res) => {
    res.render('hives/newHive')
})

//ADD A NEW HIVE (NEW HIVE FORM ENDPOINT)
app.post('/hives', async (req, res) => {
    const newHive = new Hive(req.body)
    await newHive.save()
    res.redirect('/hives')
})

//SHOW SINGLE HIVE
app.get('/hives/:id', async (req, res) => {
    const { id } = req.params
    const hive = await Hive.findById(id)
    res.render('hives/showHive', { hive })
})

//SERVE FORM FOR HIVE EDIT
app.get('/hives/:id/edit', async (req, res) => {
    const { id } = req.params
    const hive = await Hive.findById(id)
    res.render('hives/editHive', { hive })
})

//MODIFY HIVE (ENDPOINT FOR editHive.ejs)
app.put('/hives/:id', async (req, res) => {
    const { id } = req.params
    const hive = await Hive.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
    res.redirect(`/hives/${hive._id}`)
})

app.put('/hives/:id/inspection', async (req, res) => {
    const { id } = req.params
    const hive = await Hive.findByIdAndUpdate(
        {_id: id},
        { $push: { inspections: 
            {
                _id: mongoose.Types.ObjectId(),
                date: new Date(),
                details: req.body
            }
        }})
    res.redirect(`/hives/${hive._id}`)
})

//DELETE ROUTE
app.delete('/hives/:id', async (req, res) => {
    const { id } = req.params
    await Hive.findByIdAndDelete(id)
    res.redirect('/hives')
})

//ACTIVATE PORT
app.listen(process.env.PORT || PORT, ()=> {
    console.log(`server running on ${process.env.PORT || PORT}`)
})
