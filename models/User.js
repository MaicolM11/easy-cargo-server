const mongoose = require('mongoose')

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
    },
    {
      timestamps: true,
      versionKey: false,
    }
);

module.exports = User = mongoose.model('User', userSchema)