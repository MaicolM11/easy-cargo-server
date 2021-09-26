const User = require("../models/User")
const jwt = require('jsonwebtoken')

const config = require('../config')

const Role = require('../models/Role')

export const login = async (req, res) => {
    
}

export const register = async (req, res) => {
    // control error 
    // UnhandledPromiseRejectionWarning: MongoServerError: E11000 duplicate key error collection
    const { username, email, password, roles } = req.body
    const roles_found = await Role.find({ name: { $in: roles } });

    const newUser = new User({
        username,
        email,
        password: await User.encryptPass(password),
        roles: roles_found.map((role) => role._id)
    })

    const savedUser = await newUser.save(); 

    const token = jwt.sign({id: savedUser._id}, config.SECRET, {
        expiresIn: 86400
    })

    res.status(200).json(token);
}
