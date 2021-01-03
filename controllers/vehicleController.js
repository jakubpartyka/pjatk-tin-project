const VehicleRepository = require('../repository/mysql2/VehicleRepository');

exports.showVehicleList = (req, res, next) => {
    VehicleRepository.getVehicles()
        .then(vehs => {
            res.render('pages/vehicle/vehicle-list', {
                vehs: vehs,
                navLocation: 'vehicle'
            });
        });
}

exports.showAddVehicleForm = (req, res, next) => {
    const validationErrors = [];
    res.render('pages/vehicle/vehicle-form', {
        veh: {},
        pageTitle: 'Dodaj nowy pojazd',
        formMode: 'createNew',
        btnLabel: 'Dodaj',
        formAction: '/vehicle/add',
        navLocation: 'vehicle',
        validationErrors: validationErrors
    });
}

exports.showEditVehicleForm = (req, res, next) => {
    console.log("show edit veh form from veh controller");
    const registration = req.params.registration;
    const validationErrors = [];
    VehicleRepository.getVehicleById(registration)
        .then(veh => {
            res.render('pages/vehicle/vehicle-form', {
                veh: veh,
                formMode: 'edit',
                pageTitle: 'Edycja danych pojazdu',
                btnLabel: 'Edytuj dane pojazdu',
                formAction: '/vehicle/edit',
                navLocation: 'vehicle',
                validationErrors: validationErrors
            });
        });
};


exports.showVehicleDetails = (req, res, next) => {
    const registration = req.params.registration;
    VehicleRepository.getVehicleById(registration)
        .then(veh => {
            res.render('pages/vehicle/vehicle-form', {
                veh: veh,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły pojazdu',
                formAction: '',
                navLocation: 'veh'
            });
        });
}

exports.addVehicle = (req, res, next) => {
    console.log("add vehicle from veh controller");
    const vehData = {...req.body};
    VehicleRepository.createVehicle(vehData)
        .then(result => {
            res.redirect('/vehicle');
        })
        .catch(err => {
            console.log(err.details);
            res.render('pages/vehicle/vehicle-form', {
                veh: vehData,
                pageTitle: 'Dodawanie Pojazdu',
                formMode: 'createNew',
                btnLabel: 'Dodaj pojazd',
                formAction: '/vehicle/add',
                navLocation: 'veh',
                validationErrors: err.details
            });
        });
};

exports.updateVehicle = (req, res, next) => {
    console.log(req.body.registration);
    const registration = req.body.registration;
    const vehData = {...req.body};
    VehicleRepository.updateVehicle(registration, vehData)
        .then(result => {
            res.redirect('/vehicle');
        })
        .catch(err => {
            console.log(err.details);
            res.render('pages/vehicle/vehicle-form', {
                veh: vehData,
                formMode: 'edit',
                pageTitle: 'Edycja danych pojazdu',
                btnLabel: 'Edytuj dane pojazdu',
                formAction: '/vehicle/edit',
                navLocation: 'vehicle',
                validationErrors: err.details
            });
        });
};

exports.deleteVehicle = (req, res, next) => {
    const registration = req.params.registration;
    VehicleRepository.deleteVehicle(registration)
        .then(() => {
            res.redirect('/vehicle');
        });
};






