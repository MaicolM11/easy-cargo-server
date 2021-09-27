import Offer from "../models/Offer";
import Contract from "../models/Contract";

export const createCargoOffer = async (req, res) => {
    const { provider,  description, origin, destination, vehicle_type , weight, material, origin_address,
        destination_address} = req.body

    if(!provider, !origin, !destination){
        res.status(300).json({message: "Envie los campos requeridos"})
        return;
    } 

    // sacar el provider de la sesion

    const newOffer = new Offer({ 
        provider, 
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

export const getCargoOffersByID = (req, res) => {
    
}

export const removeCargoOffer = (req, res) => {
    
}
 
export const editCargoOffer = (req, res) => {
    
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