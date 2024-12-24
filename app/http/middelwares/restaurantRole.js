const jwt = require("jsonwebtoken")

const config = require("config")


module.exports = function (req, res, next) {

    try {
        const role = req.user.role
        if (role === 'restaurant') return next()
            else
        res.status(403).send({ message: 'عدم دسترسی' }) 
    } catch (error) {
        res.status(403).send({ message: error.message })
    }

}