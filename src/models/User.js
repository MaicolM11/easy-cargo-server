const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

export const CONVEYOR_STATUS = { AVAILABLE: "AVAILABLE", BUSY: "BUSY" };
//export const VEHICLE_TYPE = {LONG_TRUCK: '', TRUCK, DOUBLE_TROOP, FOUR_HANDS_TRUCK }

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

    roles: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },

    cc: String,
    status: String,
    description: String,
    vehicle_type: String,
    loading_capacity: Number,
    nit: String,
    company_name: String,
    company_address: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.statics.encryptPass = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePass = async (password, receivedPass) => {
  return await bcrypt.compare(password, receivedPass);
};

export default mongoose.model("User", userSchema);
