const mongoose = require('mongoose')

const offerSchema = mongoose.Schema(
    {
        provider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true
        },
 
        description: String,
        
        status: {
            type: String // DISPONIBLE O NO
        },

        origin: {
            type: String
        },

        destination: {
            type: String
        }
    },
    {
      versionKey: false,
      timestamps: true
    }
);

const Offer = mongoose.model('Offer', offerSchema)

module.exports = Offer