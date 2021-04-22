const router = require('express').Router();
const audioServicesViews = require('./audioRender');

router.use('/audio', audioServicesViews);

module.exports = router;