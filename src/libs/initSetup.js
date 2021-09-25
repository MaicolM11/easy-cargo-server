const Role  = require("../models/Role")
const User = require("../models/User")

const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count > 0) return;


    const values = await Promise.all([
      new Role({ name: "conveyor" }).save(),
      new Role({ name: "provider" }).save(),
      new Role({ name: "admin" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

const createAdmin = async () => {
  const user = await User.findOne({ email: "admin@easycargo" });
  const roles = await Role.find({ name: { $in: ["admin"] } });

  if (!user) {
    await User.create({
      username: "admin",
      email: "admin@easycargo",
      password: "admin",
      roles: roles.map((role) => role._id),
    });
    console.log('Admin User Created!')
  }
};

createRoles() 
createAdmin()