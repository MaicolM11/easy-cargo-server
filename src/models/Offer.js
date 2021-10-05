const mongoose = require('mongoose')

export const OFFER_STATUS = {AVAILABLE: 'AVAILABLE', IN_PROGRESS:'IN_PROGRESS', FINISH: 'FINISH'}

const offerSchema = mongoose.Schema(
    {
        provider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true
        },
 
        description: String,
        
        status: {
            type: String,
            default: OFFER_STATUS.AVAILABLE
        },

        origin: String,
        destination: String,
        vehicle_type: String,
        weight: Number,
        material: String,
        origin_address:String,
        destination_address: String
    },
    {
      versionKey: false,
      timestamps: true
    }
);

export default mongoose.model('Offer', offerSchema)
