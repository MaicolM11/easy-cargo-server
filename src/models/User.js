const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const STATUS = ["OCUPADO", "DISPONIBLE"]

const userSchema = mongoose.Schema(
    {
      username: {
        type: String,
        unique: true,
      },
      email: {
        type: String,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role",
        },
      ],
      status: String  
    },
    {
      timestamps: true,
      versionKey: false,
    }
);

userSchema.statics.encryptPass = async (password) =>{
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt);
}

userSchema.statics.comparePass = async (password, receivedPass) =>{
  return await bcrypt.compare(password, receivedPass);
}

const User = mongoose.model('User', userSchema)

module.exports = User;