const express = require('express')
const router = express.Router()
const hiveController = require('../controllers/hive')

router.get('/', hiveController.getHives)

module.exports = router