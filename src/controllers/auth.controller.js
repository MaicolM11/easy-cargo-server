import {createUser, findUser} from "./user.controller"

const jwt = require('jsonwebtoken')
const config = require('../config')

export const register = async (req, res) => {
    let savedUser = createUser(req, res);
    const token = jwt.sign({id: savedUser._id}, config.SECRET, {
        expiresIn: 86400
    })
    res.status(201).json(token);
}

 
export const login = async (req, res) => {
    let foundUser = findUser(req, res);
    if(foundUser){
        const token = jwt.sign({id: foundUser._id}, config.SECRET, {
            expiresIn: 86400
        })
        res.status(200).json(token);
    }
}
