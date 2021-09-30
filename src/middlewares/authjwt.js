const jwt = require('jsonwebtoken')
const config = require('../config')
const User = require('../models/User')
const Role = require('../models/Role')

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token']

        console.log(token);
    
        if (!token) return res.status(403).json({message: 'No token provided'})
    
        const decoded = jwt.verify(token, config.SECRET)
        req.userId = decoded.id;
        const user = User.findById(req.userId, {password: 0})
        if(!user) return res.status(404).json({message: 'User not found'})
    
        next()
    } catch (error) {
        return res.status(401).json({message: Unauthorized})
    }
   
}

export const isProvider = async (req, res, next) => {
    const user = await User.findById(req.userId)
    const role = await Role.findById({_id: {$in: user.roles}})

    console.log(role)
    if(role.name === "PROVIDER" || role.name === "ADMIN") next()

    return res.status(403).json({message: 'Provider rol is required'})
}

export const isDriver = async (req, res, next) => {
    const user = await User.findById(req.userId)
    const role = await Role.findById({_id: {$in: user.roles}})

    console.log(role)
    if(role.name === "CONVEYOR" || role.name === "ADMIN") next()

    return res.status(403).json({message: 'Driver rol is required'})
}