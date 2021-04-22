const mongoose = require('mongoose');

mongoose.pluralize(null);

const deviceSchema = new mongoose.Schema({
    sName: String,
    sModel: String,
    sBrand: String,
    sConnectorType: String,
    sMicrophone: String,
    sColor: String,
    aCompatible_devices: [
            {type: String, default: "Laptop"},
            {type: String, default: "Tablet"},
            {type: String, default: "Smartphone"}
    ],
    nItem_wgt: Number,
    sCategory: {type: String, default: "Audio"},
    sProduct_type: {type: String, default: "Earphone"},
    nPrice: Number
});

module.exports = mongoose.model("Audio", deviceSchema);