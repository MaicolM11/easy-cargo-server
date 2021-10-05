const express = require("express");
const router = express.Router();
const controller = require('../controllers/offer.controller')

const { verifyToken, isProvider, isDriver } = require("../middlewares/authjwt");

// proveedor 
router.post('/', [verifyToken, isProvider] , controller.createCargoOffer); // send user id
router.put('/:offerId', [verifyToken, isProvider], controller.editCargoOffer);
router.delete('/:offerId', [verifyToken, isProvider], controller.removeCargoOffer);
router.get('/myoffers',[verifyToken, isProvider],controller.getCargoOffersByProvider)

// transportador
router.put('/:offerID/accept', [verifyToken, isDriver], controller.acceptOffer);

//Todos
router.get('/search', verifyToken, controller.getOffersWithFilter);
router.get('/',verifyToken, controller.getCargoOffers);

// filtros

module.exports = router; 