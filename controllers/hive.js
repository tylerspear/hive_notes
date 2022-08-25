const Hive = require('../models/Hive')

module.exports = {
    getHives: async (req, res) => {
        console.log('in controller')
        try {
            const hives = await Hive.find({})
            res.render('hives/hiveIndex', { hives })
        } 
        catch(err){
            console.error(err)
        }
    }
}