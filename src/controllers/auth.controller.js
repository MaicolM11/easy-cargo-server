import Role from "../models/Role"
import User from "../models/User"
import {createUser, savedUser, findUser, foundUser} from "./user.controller"

const jwt = require('jsonwebtoken')
const config = require('../config')

export const register = async (req, res) => {
    createUser(req, res);
    const token = jwt.sign({id: savedUser._id}, config.SECRET, {
        expiresIn: 86400
    })
    res.status(200).json(token);
}

export const login = async (req, res) => {
    findUser(req, res);
    const token = jwt.sign({id: foundUser._id}, config.SECRET, {
        expiresIn: 86400
    })
    res.status(200).json(token);
}
