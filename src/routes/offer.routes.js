const express = require("express");
const controller = require('../controllers/offer.controller')

const router = express.Router();


// proveedor
router.post('/', controller.createCargoOffer); // send user id
router.get('/:offerID', controller.getCargoOffersByID);
router.put('/:offerID', controller.editCargoOffer);
router.delete('/:offerID', controller.removeCargoOffer);

// transportador
router.put('/:offerID/accept', controller.acceptOffer);
router.get('/', controller.getCargoOffers);


module.exports = router; 