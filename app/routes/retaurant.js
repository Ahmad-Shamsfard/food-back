const express = require('express')
const router = express.Router()
const restaurantModel = require('../models/restaurant')
const _ = require('lodash')
const { updateValidator,registorValidator,idValidator,loginValidator,foodValidator,updatefoodValidator}  = require('../http/validators/restaurant')
const bcrypt = require('bcrypt')
const Auth = require('../http/middelwares/Auth')
const restaurantRole = require('../http/middelwares/restaurantRole')
const { default: mongoose } = require('mongoose')

 
router.get('/', async (req, res) => {
    const restaurant = await restaurantModel.find().select('name address description score pic adminUser').limit(20)
    res.send(restaurant)
})

router.get('/:id', async (req, res) => {
    if (!idValidator(req.params.id)) return res.status(400).send({ message:'unvalid id' })
    const restaurant = await restaurantModel.findById(req.params.id).select('name address description score pic adminUser').limit(20)
    res.send(restaurant)
})
router.post('/', async (req, res) => {
    //validation
    const { error } = registorValidator(req.body)
    if (error) return res.status(400).send({ message: error.message })
    // check for duplicated    
    let restaurant = await restaurantModel.find({ name: req.body.name })
    console.log(restaurant);
    
    if (restaurant) return res.status(400).send({ message: 'رستوران  تکراری است' })
    //create restaurant    
    restaurant =new  restaurantModel(
        _.pick(req.body, [
          'name',
          'description',
          'address',
          'adminUser',
          'adminPassword',
        ]),
      )
    const salt = await bcrypt.genSalt(10)
    restaurant.adminPassword =await bcrypt.hash(restaurant.adminPassword, salt)

    restaurant = await restaurant.save()
    res.send(restaurant)
})

router.put('/:id', async (req, res) => {
    let { error } = updateValidator({ ...req.body })
    if (error) return res.status(400).send({ message: error.message })

    if (!idValidator(req.params.id)) return res.status(400).send({ message:'unvalid id' })

    const restaurant = await restaurantModel.findByIdAndUpdate(req.params.id, {
        $set: _.pick(req.body, [
            'name',
            'description',
            'address',
            'adminUser',
            'adminPassword'
        ])
    }
        , { new: true })
        .select(_.pick('name address adminUser'))
    if(!restaurant) return   res.status(404).send({ message:'رستوران مورد نظر وجود ندارد'})
    res.send(_.pick(restaurant, [
        'name',
        'description',
        'address',
        'adminUser',
        'adminPassword'
    ]))
})

router.delete('/:id', async (req, res) => {
    if (!idValidator(req.params.id)) return res.status(400).send({ message:'unvalid id' })

    const restaurant=await restaurantModel.findByIdAndRemove(req.params.id)
    res.status(200).send(true)
})

router.post('/admin/login', async (req, res) => {
    //validation
    const { error } = loginValidator(req.body)
    if (error) return res.status(400).send({ message: error.message })
    // check for duplicated    
    const restaurant = await restaurantModel.findOne({ adminUser: req.body.adminUser })
    // console.log(restaurant);
    
    if (!restaurant) return res.status(400).send({ message:'رمز یا اسم  اشتباه است' })
    //check pass 
    // console.log('model:',restaurant);
    // console.log('body:',req.body.adminPassword);
    const passCompare= await bcrypt.compare(req.body.adminPassword, restaurant.adminPassword)
    if(!passCompare) 
        return res 
        .status(400)
        .send({ message:'رمز یا اسم  اشتباه است'})
    //create token
    const token = restaurant.generateToken()
    res.header("Access-Control-Expose-headers","x-auth-token").header('x-auth-token',token).status(200).send({ message: true })

})

router.post('/foods/addFood',[Auth ,restaurantRole],async (req, res) => {
    let { error } = foodValidator({ ...req.body })
    if (error) return res.status(400).send({ message: error.message })

    const restaurant = await restaurantModel.findById(req.user._id)
    if (!restaurant) return res.status(404).send({message :"رستوران یافت نشد"})
    
    restaurant.menu.push(_.pick(req.body,['name','description','price'])) 
    await restaurant.save()   
    res.status(200).send(restaurant.menu)
})
router.get('/foods/getfoodlist',[Auth ,restaurantRole],async (req, res) => {
    const restaurant = await restaurantModel.findById(req.user._id)
    if (!restaurant) return res.status(404).send({message :"رستوران یافت نشد"})

    res.status(200).send(restaurant.menu)
    
    })
    
    router.delete('/foods/deleteFood/:foodId',[Auth ,restaurantRole],async (req, res) => {
    
        const restaurant = await restaurantModel.findById(req.user._id)
        if (!restaurant) return res.status(404).send({message :"رستوران یافت نشد"})

        const foodId = req.params.foodId
        
        if(!mongoose.isValidObjectId(foodId)) return res.status(400).send({message :"unvalid moongoose id"})
        
        if(!restaurant.menu.id(foodId)) return res.status(400).send({message :"unvalid food id"})
        
        restaurant.menu.id(foodId).deleteOne () 
        await restaurant.save()   
        res.status(200).send(restaurant.menu)
    })    

    router.put('/foods/updateFood/:foodId',[Auth ,restaurantRole],async (req, res) => {
    
        const restaurant = await restaurantModel.findById(req.user._id)
        if (!restaurant) return res.status(404).send({message :"رستوران یافت نشد"})

        const foodId = req.params.foodId
        
        if(!mongoose.isValidObjectId(foodId)) return res.status(400).send({message :"unvalid moongoose id"})
        
        if(!restaurant.menu.id(foodId)) return res.status(400).send({message :"unvalid food id"})
        

        const { error } = updatefoodValidator({ ...req.body })
        if (error) return res.status(400).send({ message: error.message })

        //     await restaurant.menu.id(foodId).updateOne({},{$set:{
        //     name:req.body.name,
        //     description:req.body.description,
        //     price:req.body.price
        // } 
        // }).then(restaurant=>

        // )
        if(req.body.name) restaurant.menu.id(foodId).name=req.body.name
        if(req.body.description) restaurant.menu.id(foodId).description=req.body.description
        if (price=req.body.price)  restaurant.menu.id(foodId).price=req.body.price
        

        await restaurant.save()   
        res.status(200).send(restaurant.menu)
    })  

module.exports =router