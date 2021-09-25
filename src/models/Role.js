const mongoose = require('mongoose')

const roleSchema = mongoose.Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

const Role = mongoose.model('Role', roleSchema)
module.exports = Role