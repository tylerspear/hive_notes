const express = require('express')
const router = express.Router()
const hiveController = require('../controllers/hive')

// @desc Show all hives
// @route GET '/hives'
router.get('/', hiveController.getHives)

// @desc Show add form
// @route GET '/hives/add'
router.get('/new', hiveController.newHive)

// @desc process the add form
// @route POST '/hives'
router.post('/', hiveController.addHive)


module.exports = router