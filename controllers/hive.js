const Hive = require('../models/Hive')

module.exports = {
    getHives: async (req, res) => {
        try {
            const hives = await Hive.find({})
            res.render('hives/hiveIndex', { hives })
        } 
        catch(err){
            console.error(err)
        }
    },
    newHive: (req, res) => {
        res.render('hives/newHive')
    },
    addHive: async (req, res) => {
        try {
            const newHive = new Hive(req.body)
            await newHive.save()
            res.redirect('/hives')
        }
        catch (err) {
            console.log(err)
        }
    },
}