const mongoose = require('mongoose');

var deviceSchema = new mongoose.Schema({
    sName: String,
    sModel: String,
    sModel_name: String,
    sBrand: String,
    sColor: String,
    aMemory: {
        nRam: Number,
        nHdd: Number
    },
    aProcessor: {
        sName: String,
        sVersion: String,
        nGhz : Number 
    },
    sOS: String,
    sBattery: String,
    nPrice: Number
});

module.exports = mongoose.model('SmartphoneDevice', deviceSchema, 'Smartphones');