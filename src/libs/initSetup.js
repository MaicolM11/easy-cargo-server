import Role from "../models/Role"
import User from "../models/User";
import { ROLES } from "../models/Role";

const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count > 0) return;

    Object.values(ROLES).forEach(rol => new Role({ name: rol }).save())
    
    console.log("Roles creados");
  } catch (error) {
    console.error(error);
  }
};

const createAdmin = async () => {
  const user = await User.findOne({ email: "admin@easycargo" });
  const roles = await Role.find({ name: { $in: Object.keys(ROLES) } });

  if (!user) {
    await User.create({
      username: "admin",
      email: "admin@easycargo",
      password: await User.encryptPass("admin"),
      roles: roles.map((role) => role._id),
    });
    console.log('Admin User Created!')
  }
};
  
createRoles() 
createAdmin()