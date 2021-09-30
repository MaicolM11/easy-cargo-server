const { request } = require("express");
const express = require("express");
const controller = require('../controllers/offer.controller')
const {authjwt} = require('../middlewares');
const { verifyToken } = require("../middlewares/authjwt");
const router = express.Router();


// proveedor 
router.post('/', [authjwt.verifyToken, authjwt.isProvider] , controller.createCargoOffer); // send user id
router.put('/:offerID', [authjwt.verifyToken, authjwt.isProvider], controller.editCargoOffer);
router.delete('/:offerID', [authjwt.verifyToken, authjwt.isProvider], controller.removeCargoOffer);

// transportador
router.put('/:offerID/accept', [authjwt.verifyToken, authjwt.isDriver], controller.acceptOffer);

//Todos
router.get('/:offerID',verifyToken, controller.getCargoOffersByID);
router.get('/',verifyToken, controller.getCargoOffers);

module.exports = router; 