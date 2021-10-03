import Offer from "../models/Offer";
import Contract from "../models/Contract";

export const createCargoOffer = async (req, res) => {
    const { description, origin, destination, vehicle_type , weight, material, origin_address,
        destination_address} = req.body

    if(!origin, !destination){
        res.status(300).json({message: "Envie los campos requeridos"})
        return;
    } 
 
    // sacar el provider de la sesion
    const newOffer = new Offer({ 
        provider: req.userId, 
        description, 
        origin, 
        destination,
        vehicle_type,
        weight,
        material,
        origin_address,
        destination_address 
    })

    const offerSaved = await newOffer.save(); 

    res.status(201).json(offerSaved);
}

export const getCargoOffers = async (req, res) => {
    let result = await Offer.find()
    res.status(200).json(result)
}

export const getCargoOffersByID = async (req, res) => {
    let result = await Offer.findById(req.params.offerId)
    res.status(200).json(result)
}

export const getCargoOffersByProvider = async (req, res) => {
    let offers = await Offer.find({provider: req.userId})
    res.status(200).json(offers)
}

export const removeCargoOffer = async (req, res) => {
    await Offer.findByIdAndDelete(req.params.offerId)
    res.status(204);
}
 
export const editCargoOffer = async (req, res) => {
    const offer = await Offer.findByIdAndUpdate(req.params.offerId, req.body,{
        new: true
    })
    res.status(201).json(offer);
}

// CONTRACT
export const acceptOffer = async (req, res) => {

    const { offerID } = req.params; 
    const { conveyor } = req.body; // de la sesion

    // revisar que el transportador este disponible
    if(!offerID,  !conveyor){
        res.status(300).json({message: "Envie los campos requqridos"})
        return;
    } 

    let newContract = new Contract({
        offer: offerID,
        conveyor,        
    })
     
    let saveContract = await newContract.save()
    res.status(200).json(saveContract)

}

export const getOffersWithFilter = async (req, res)=> {
    let offers = await Offer.find(req.query)
    res.status(200).json(offers)
}