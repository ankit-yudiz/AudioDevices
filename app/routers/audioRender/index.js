const router = require('express').Router();
const controllers = require('./lib/controllers');

router.get('/', controllers.homePageController);
router.get('/insertAudioDevice', controllers.insertViewController);
router.get('/updateAudioDevice', controllers.updateViewController);
router.get('/deleteDevice', controllers.deleteViewController);
router.get('/devicePagination', controllers.getPaginationController);

module.exports = router;