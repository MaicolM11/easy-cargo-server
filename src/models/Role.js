const mongoose = require('mongoose')

export const ROLES = { CONVEYOR: "CONVEYOR", PROVIDER: "PROVIDER", ADMIN: "ADMIN" }

const roleSchema = mongoose.Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

export default mongoose.model('Role', roleSchema)