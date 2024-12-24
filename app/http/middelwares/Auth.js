const jwt = require("jsonwebtoken")

const config = require("config")


module.exports =  function (req,res,next){
    try {
        const token = req.header('x-auth-token')
    if(!token)return res.status(403).send({message:'عدم دسترسی'})
        const user = jwt.verify(token,config.get('jwtPrivateKey'))
        req.user= user
        next()
    } catch (error) {
        res.status(403).send({message:error.message})
    }
    
}