exports.showVehicleList = (req, res, next) => {
    res.render('pages/vehicle/vehicle-list', {navLocation: 'vehicle' });
}

exports.showAddVehicleForm = (req, res, next) => {
    res.render('pages/vehicle/vehicle-form', {navLocation: 'vehicle' });
}

exports.showVehicleDetails = (req, res, next) => {
    res.render('pages/vehicle/vehicle-info', {navLocation: 'vehicle' });
}




