import User from "../models/User";
import Role from "../models/Role"
import { ROLES } from "../models/Role"
import { CONVEYOR_STATUS } from "../models/User"

export const createUser = async (req, res) => {
    
    const { username, email, password, rol, description } = req.body
    const rol_found = await Role.findOne({ name: rol.toUpperCase() });

    const newUser = new User({
        username,
        email,
        password: await User.encryptPass(password), 
        roles: rol_found._id,
        description
    });

    if(ROLES.CONVEYOR == rol_found.name){
        const {vehicle_type, loading_capacity, cc} = req.body
        newUser.status = CONVEYOR_STATUS.AVAILABLE
        newUser.vehicle_type = vehicle_type
        newUser.loading_capacity = loading_capacity;
        newUser.cc = cc;
    }

    if(ROLES.PROVIDER == rol_found.name){
        const {nit, company_name, company_address } = req.body
        newUser.nit = nit;
        newUser.company_name = company_name
        newUser.company_address = company_address
    }

    const savedUser = await newUser.save();     
    return savedUser;
}

export const getUsers = async (req, res) => {
    let rol = req.query.role
    const rol_found = await Role.findOne({ name: rol.toUpperCase() });
    let data = await User.find({roles: rol_found._id }, 'username email loading_capacity vehicle_type cc status');
    res.status(200).json(data)
}

export const findUser = async (req, res) => {
    const foundUser = await User.findOne({email: req.body.email}).populate('roles')  
    if(!foundUser)  {
        res.status(400).json({message: 'User not found'})
        return false;
    }
    const matchPass = await User.comparePass(req.body.password, foundUser.password)
    if (!matchPass) {
        res.status(401).json({ message: 'Invalid Password'})
        return false;
    }
    return foundUser;    
}

export const getUserByID = async (req, res) => {
    const user = await User.findById(req.params.userId)
    res.status(201).json(user);
}

export const removeUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.userId)
    res.status(204);
}
 
export const editUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body,{
        new: true
    })
    res.status(201).json(user);
}
