const mongoose = require('mongoose')

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
          type: String  // ACTIVO - CANCELADO - TERMINADO
      }

  },
  {
    versionKey: false,
    timestamps: true
    }
);

const Contract = mongoose.model('contract', contractSchema)

module.exports = Contract