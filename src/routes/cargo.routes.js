const express = require("express");
const router = express.Router();
const controller = require('../controllers/cargo.controller')

router.post('/', controller.createCargoOffer);
router.get('/', controller.getCargoOffers);
router.get('/:offerID', controller.getCargoOffersByID);
router.put('/:offerID', controller.editCargoOffer);
router.delete('/:offerID', controller.removeCargoOffer);

module.exports = router; 