const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('config')
const commentSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    text: { type: String, required: true },
    score: { type: Number, required: true }
})
const foodsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    comments: [commentSchema]
})

const restaurantSchema = new mongoose.Schema({
    name:   { type: String, required: true },
    pic:      { type: String },
    description: { type: String },
    address:   { type: String, required: true },
    menu:      [foodsSchema],
    score: { type: Number},
    comments:  [commentSchema],
    adminUser: { type: String, required: true },
    adminPassword: { type: String, required: true },
})

restaurantSchema.methods.generateToken = function () { 
    const data ={
        _id: this._id,
        name:this.name,
        role:'restaurant'
    }
    return jwt.sign(data,config.get('jwtPrivateKey'))
} 

module.exports= mongoose.model('restaurant',restaurantSchema)