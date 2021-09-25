const mongoose = require('mongoose')

const roleSchema = mongoose.Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

module.exports = Role = mongoose.model('Role', roleSchema)