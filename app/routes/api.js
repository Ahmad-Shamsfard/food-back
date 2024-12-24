const express = require('express')
const router = express.Router()
const restaurantRoutes = require('./retaurant')

router.use('/restaurant',restaurantRoutes)

module.exports=router