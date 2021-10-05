const mongoose = require('mongoose')

export const CONTRACT_STATUS = { ACTIVE: 'ACTIVE', CANCELLED: 'CANCELLED', FINISH: 'FINISH'}

const contractSchema = mongoose.Schema(
  {
      offer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Offer"
      },
      
      conveyor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },

      status: {
          type: String,
          default: CONTRACT_STATUS.ACTIVE
      }

  },
  {
    versionKey: false,
    timestamps: true
    }
);

export default mongoose.model('contract', contractSchema)