import Offer from "../models/Offer";

export const createCargoOffer = async (req, res) =>{
    
    const {  } = req.body

    const newOffer = new Offer({})

    const offerSaved = await newOffer.save(); 

    res.status(201).json(offerSaved);
}

export const getCargoOffers = async (req, res) => {
    await Offer.find()
}

export const getCargoOffersByID = (req, res) => {
    
}

export const removeCargoOffer = (req, res) => {
    
}
 
export const editCargoOffer = (req, res) => {
    
}
