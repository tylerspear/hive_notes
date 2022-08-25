// ********* GLOBALS *********
const express = require('express')
const app = express()
const PORT = 8500
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
require('dotenv').config()

const mainRoutes = require('./routes/main')
const hiveRoutes = require('./routes/hive')

const connectDB = require('./config/database')

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
app.use(express.json())


// ********* DATABASE *********
connectDB()

// ********* ROUTES *********
//Home Route
app.use('/', mainRoutes)

//Hive routes
app.use('/hives', hiveRoutes)


// //SHOW SINGLE HIVE
// app.get('/hives/:id', async (req, res) => {
//     const { id } = req.params
//     const hive = await Hive.findById(id)
//     res.render('hives/showHive', { hive })
// })

// //SERVE FORM FOR HIVE EDIT
// app.get('/hives/:id/edit', async (req, res) => {
//     const { id } = req.params
//     const hive = await Hive.findById(id)
//     res.render('hives/editHive', { hive })
// })

// //MODIFY HIVE (ENDPOINT FOR editHive.ejs)
// app.put('/hives/:id', async (req, res) => {
//     const { id } = req.params
//     const hive = await Hive.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
//     res.redirect(`/hives/${hive._id}`)
// })

// app.put('/hives/:id/inspection', async (req, res) => {
//     const { id } = req.params
//     const hive = await Hive.findByIdAndUpdate(
//         {_id: id},
//         { $push: { inspections: 
//             {
//                 _id: mongoose.Types.ObjectId(),
//                 date: new Date(),
//                 details: req.body
//             }
//         }})
//     res.redirect(`/hives/${hive._id}`)
// })

// //DELETE ROUTE
// app.delete('/hives/:id', async (req, res) => {
//     const { id } = req.params
//     await Hive.findByIdAndDelete(id)
//     res.redirect('/hives')
// })

//ACTIVATE PORT
app.listen(process.env.PORT || PORT, ()=> {
    console.log(`server running on ${process.env.PORT || PORT}`)
})
