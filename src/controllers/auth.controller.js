const User = require("../models/User")
const jwt = require('jsonwebtoken')
const config = require('../config')

export const login = async (req, res) => {
    
}

export const register = async (req, res) => {

    const { username, email, password, roles } = req.body

    const newUser = new User({
        username,
        email,
        password: User.encryptPass(password)
    })

    const savedUser = await newUser.save(); 

    const token = jwt.sign({id: savedUser._id},config.SECRET, {
        expiresIn: 86400
    })

    res.status(200).json(token);
}