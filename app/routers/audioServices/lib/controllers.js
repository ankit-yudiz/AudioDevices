const {
    mAudio,
    mSmartphone
} = require('../../../models/index.js');
const controllers = {};

/**
 * @dev This will insert a new device data into the 
 * database
 * @param {any} req 
 * @param {any} res 
 * @returns res(status, message)
 */
controllers.insertAudioDevice = async (req, res) => {
    try {
        const oNewDevice = new mAudio({
            sName: req.body.sName,
            sModel: req.body.sModel,
            sBrand: req.body.sBrand,
            sConnectorType: req.body.sConnectorType,
            sMicrophone: req.body.sMicrophone,
            sColor: req.body.sColor,
            nItem_wgt: req.body.nWeight,
            nPrice: req.body.nPrice
        });
        if(/oNewDevice.sModel/i.test(oNewDevice.sName))
            return res.reply(messages.invalid_req(), {message: "Model Name should be included in the product name"});

        mAudio.findOne({sName: oNewDevice.sName}, function(err, jDoc){
            if(jDoc){
                console.log(jDoc);
                return res.reply(messages.already_exists("Name or Model"), {data: jDoc});
            }
            else{
                oNewDevice.save(function (err, jDevice) {
                    if (err)
                        return res.reply(messages.insertion_failed(req.body.sName));
                    return res.reply(messages.successfully(oNewDevice.sName + " inserted"), {
                            Record: jDevice
                        });
                });
            }
        });
    } catch (err) {
        return res.reply(messages.server_error("Internal"));
    }
}


/**
 * @dev This will update the particular record in the 
 * database by giving the sId
 * @param {any} req 
 * @param {any} res 
 * @returns res(status, message)
 */
controllers.updateAudioDevice = async (req, res) => {
    try {
        if (!req.body.sId)
            return res.reply(messages.required_field("sId"));
        mAudio.updateOne({
            _id: req.body.sId
        }, {
            $set: {
                sName: req.body.sName,
                sModel: req.body.sModel,
                sBrand: req.body.sBrand,
                sConnectorType: req.body.sConnectorType,
                sMicrophone: req.body.sMicrophone,
                sColor: req.body.sColor,
                nItem_wgt: req.body.nWeight,
                nPrice: req.body.nPrice
            }
        }, function (err, jDevice) {
            if (err)
                return res.reply(messages.not_found("Record with this sId"));
            return res.reply(messages.successfully("Record updated"), {
                new_record: jDevice
            });
        });
    } catch (err) {
        return res.reply(messages.server_error("Internal"));
    }
}


/**
 * @dev This will get some particular no. of documents 
 * from the database
 * @param {any} req 
 * @param {any} res 
 * @returns res(status, message)
 */
controllers.getDevicesData = async (req, res) => {
    try {
        //res.render('showDataPage.ejs');
        mAudio.find({}, (err, aDevices) => {
            if (err) {
                return res.reply(messages.error("Data fetch"));
            } else {
                // return res.reply(messages.successfully("Data fetch"), {
                //     data: aDevices
                // });
                res.render('deviceTable', {
                    aList: aDevices
                });
            }
        }).limit(Number(req.body.nLimit));
    } catch (err) {
        return res.reply(messages.server_error("Internal"));
    }
}

/**
 * @dev This will delete a record from the database 
 * on the basis of sId 
 * @param {any} req 
 * @param {any} res 
 * @returns res(status, message)
 */
controllers.deleteDevice = async (req, res) => {
    try {
        mAudio.deleteOne({
            _id: req.body.sId
        }, (err, jDevice) => {
            if (err)
                return res.reply(messages.error("Deletion"));
            return res.reply(messages.successfully("sId: " + req.body.sId + " deleted"), {
                deleted: jDevice
            });
        });
    } catch (err) {
        return res.reply(messages.server_error("Internal"));
    }
}

/**
 * @dev This will delete all records
 * form the database
 * @param {any} req 
 * @param {any} res 
 * @returns 
 */
controllers.deleteAllDevices = async (req, res) => {
    try {
        mAudio.deleteMany({}, (err, aDevices) => {
            if (err) {
                res.reply(messages.error("Deletion"));
            } else {
                res.reply(messages.successfully("All records deleted"));
            }
        });
    } catch (err) {
        return res.reply(messages.server_error("Internal"));
    }
}

/*
controllers.devicePagination = async (req, res) => {
    try {
        let nPageNo = Number(req.body.nPageNo);
        let nPageLength = Number(req.body.nPageLength)
        mAudio.count({}, (err, nCount) => {
            if (err) {
                res.reply(messages.error("Document count"));
            } else {
                if (nPageNo > 0 && (((nPageNo * nPageLength) - nPageLength) <= nCount)) {
                    console.log(nPageNo, ' <====> ', nCount);
                    let aPipe;
                    if (nPageNo == 1)
                        aPipe = [{
                            $skip: 0
                        }, {
                            $limit: nPageLength
                        }];
                    else
                        aPipe = [{
                            $skip: (nPageNo - 1) * nPageLength
                        }, {
                            $limit: nPageLength
                        }];
                    mAudio.aggregate(aPipe, (err, aDevices) => {
                        if (err) {
                            return res.reply(messages.error("Data fetch"));
                        } else {
                        //     return res.reply(messages.successfully("Data fetch"), {
                        //         data: aDevices
                        //     });
                            return res.reply(messages.successfully("Fetch"), {data: aDevices});
                    }
                    });
                } else {
                    return res.reply(messages.error("Invaid Page"));
                }
            }
        });
    } catch (err) {
        return res.reply(messages.server_error("Internal"));
    }
}
*/


controllers.devicePagination = async (req, res) => {
    try {
        console.log(req.body)
        console.log(req.body.start);
        console.log(req.body.length);
        mAudio.countDocuments({}, function (err, nCount) {
            mAudio.find({}, {}, {
                skip: Number(req.body.start),
                limit: Number(req.body.length)
            }, function (err, aDevice) {
                if (err)
                    return res.reply(messages.error("Data Fetching"));
                var data = JSON.stringify({
                    "draw": req.body.draw,
                    "recordsFiltered": nCount,
                    "recordsTotal": nCount,
                    "data": aDevice
                });
                res.send(data);
            });
        });
    } catch (err) {
        return res.reply(messages.server_error("Internal"));
    }
}


/**
 * @dev Exporting the controllers object
 */
module.exports = controllers;
