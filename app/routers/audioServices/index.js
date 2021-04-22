const router = require('express').Router();
const controllers = require('./lib/controllers');


router.post('/insertAudioDevice', controllers.insertAudioDevice); // This will insert one record
router.post('/updateAudioDevice', controllers.updateAudioDevice); // This will update a record
router.get('/getDevicesData', controllers.getDevicesData);   // This will show particular no. of records 
router.post('/devicePagination', controllers.devicePagination); // This will get fix No. of data page wise
router.post('/deleteDevice', controllers.deleteDevice);   // This will delete a record from the database
router.delete('/deleteAllDevices', controllers.deleteAllDevices); //This will delete all record from the databse

module.exports = router;