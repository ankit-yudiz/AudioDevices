const controllers = {};

controllers.homePageController = (req, res) => {
    res.render('introPage');
}

controllers.insertViewController = (req, res) => {
    res.render('insertPage');
}

controllers.updateViewController = (req, res) => {
    res.render('updatePage');
}

controllers.deleteViewController = (req, res) => {
    res.render('deleteDevice');
}

controllers.getDevicesList = (req, res) => {
    res.render('deviceTable');
}

controllers.getPaginationController = (req, res) => {
    res.render('devices-pagination');
}

module.exports = controllers;

