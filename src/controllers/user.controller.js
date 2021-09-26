import User from "../models/User";


// para que? - el mismo register?
export const createUser = async (req, res) =>{
    
    const { username, email, password, roles } = req.body

    const newUser = new User({username, email, password, roles})

    const savedUser = await newUser.save(); 

    res.status(201).json(savedUser);
}

export const getUsers = async (req, res) => {
    await User.find();
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
