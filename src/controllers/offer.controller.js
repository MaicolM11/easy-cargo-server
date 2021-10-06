import Offer from "../models/Offer";
import Contract from "../models/Contract";
import User from "../models/User";

import { OFFER_STATUS } from "../models/Offer";
import { CONVEYOR_STATUS } from "../models/User";
import { CONTRACT_STATUS } from "../models/Contract";

export const createCargoOffer = async (req, res) => {
  const {
    description,
    origin,
    destination,
    vehicle_type,
    weight,
    material,
    origin_address,
    destination_address,
  } = req.body;

  if ((!origin, !destination)) {
    res.status(300).json({ message: "Envie los campos requeridos" });
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
    destination_address,
  });

  const offerSaved = await newOffer.save();

  res.status(201).json({message : 'Nueva oferta de trabajo creada'});
};

export const getCargoOffers = async (req, res) => {
  let result = await Offer.find();
  res.status(200).json(result);
};

export const getCargoOffersByID = async (req, res) => {
  let result = await Offer.findById(req.params.offerId);
  res.status(200).json(result);
};

export const getCargoOffersByProvider = async (req, res) => {
  let offers = await Offer.find({ provider: req.userId }).populate('provider');
  res.status(200).json(offers);
};

export const removeCargoOffer = async (req, res) => {
  const user = await Offer.findByIdAndDelete(req.params.offerId);
  res.status(204).json(user);
};

export const editCargoOffer = async (req, res) => {
  const offer = await Offer.findByIdAndUpdate(req.params.offerId, req.body, {
    new: true,
  });
  res.status(201).json(offer);
};

// CONTRACT
export const acceptOffer = async (req, res) => {
  const { offerID } = req.params;
  const conveyorID = req.userId;

  // revisar que el transportador este disponible
  if ((!offerID, !conveyorID)) {
    res.status(400).json({ message: "Envie los campos requeridos" });
    return;
  }

  const offer = await Offer.findById(offerID);
  const conveyor = await User.findById(conveyorID);

  if (!offer || !conveyor) {
    res.status(404).json({ message: "Datos incorrectos" });
    return;
  }

  if (conveyor.status == CONVEYOR_STATUS.BUSY) {
    res
      .status(400)
      .json({
        message:
          "Usted esta ocupado actualmente, no puede acceder a mas ofertas",
      });
    return;
  }

  offer.status = OFFER_STATUS.IN_PROGRESS;
  await offer.save();

  conveyor.status = CONVEYOR_STATUS.BUSY;
  await conveyor.save();

  let newContract = new Contract({
    offer: offerID,
    conveyor: conveyorID,
  });

  let saveContract = await newContract.save();

  res.status(200).json({ message: "Contrato realizado!" });
};

//OFFER FILTERS
export const getOffersWithFilter = async (req, res) => {
  let offers = await Offer.find(req.query).populate('provider');
  res.status(200).json(offers);
};

export const getOffersWithFilterByProvider = async (req, res) => {
  let offers = await Offer.find({
    status: req.query.status,
    provider: req.userId,
  });
  res.status(200).json(offers);
};

//TERMINATE OFFERS

export const terminateOffer = async (req, res) => {
  const { offerId } = req.params;

  const offer = await Offer.findById(offerId);

  offer.status = OFFER_STATUS.FINISH;
  await offer.save();

  const contract = await Contract.find({
      offer: offerId
  });

  contract.status = CONTRACT_STATUS.FINISH;
  await contract.save();

  const conveyorId = contract.conveyor
  
  const conveyor = await User.findById(conveyorId);
  conveyor.status = CONVEYOR_STATUS.AVAILABLE
  await conveyor.save()
  
  res.status(200).json({ message: "Oferta Finalizada" });
};

//Contracts
export const getConveyorContracts = async (req, res)=> {
    req.query.conveyor = req.userId
    let contracts = await Contract.find(req.query).populate('offer')
    res.status(200).json(contracts)
}

export const getProviderContracts = async (req, res)=> {
    req.query.provider = req.userId
    let contracts = await Contract.find(req.query).populate('offer').populate('conveyor')
    res.status(200).json(contracts)
}