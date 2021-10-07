const express = require("express");
const router = express.Router();
const controller = require('../controllers/offer.controller')

const { verifyToken, isProvider, isDriver } = require("../middlewares/authjwt");

// proveedor 
router.post('/', [verifyToken, isProvider] , controller.createCargoOffer); // send user id
router.put('/:offerId', [verifyToken, isProvider], controller.editCargoOffer); //edit offer
router.delete('/:offerId', [verifyToken, isProvider], controller.removeCargoOffer); //delete offer
router.get('/myoffers',[verifyToken, isProvider],controller.getCargoOffersByProvider) //show my offers

// transportador
router.put('/:offerID/accept', [verifyToken, isDriver], controller.acceptOffer);
router.get('/conveyor/search', [verifyToken, isDriver], controller.getConveyorContracts);

//Todos 
router.get('/search', verifyToken, controller.getOffersWithFilter);
router.get('/',verifyToken, controller.getCargoOffers);
router.put('/:offerId/terminate', verifyToken, controller.terminateOffer) //terminate offer
router.put('/:offerId/cancel', verifyToken, controller.cancelOffer) //Cancel Offer
router.get('/contract', verifyToken, controller.getContracts) //Contracts by Query

// filtros
router.get('/myoffers/search',[verifyToken, isProvider],controller.getOffersWithFilterByProvider)
router.get('/myoffers/finished',[verifyToken, isProvider], controller.getProviderContracts)
module.exports = router; 