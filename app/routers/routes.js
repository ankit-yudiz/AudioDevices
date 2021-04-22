const router = require('express').Router();
const audioServices = require('./audioServices');

router.use('/audioServices', audioServices);

module.exports = router;
