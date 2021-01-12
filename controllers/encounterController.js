const EncounterRepository = require('../repository/mysql2/EncounterRepository');

const CameraRepository = require('../repository/mysql2/CameraRepository');
const VehicleRepository = require('../repository/mysql2/VehicleRepository');


exports.showEncounterList = (req, res, next) => {
    EncounterRepository.getEncounters()
        .then(encs => {
            res.render('pages/encounter/encounter-list', {
                encs: encs,
                navLocation: 'encounter'
            });
        });
}

exports.showAddEncounterForm = (req, res, next) => {
    let allCams, allVehs;
    const enc = {
        id: -1,
        Camera_id: -2,
        Car_registration: -3,
        authorized: 0,
        direction: 1
    }
    CameraRepository.getCameras()
        .then(cams => {
            allCams = cams;
            return VehicleRepository.getVehicles();
        })
        .then(vehs => {
            allVehs = vehs;
            res.render('pages/encounter/encounter-form', {
                allCams: allCams,
                allVehs: allVehs,
                enc: enc,
                pageTitle: 'Nowy wpis',
                formMode: 'createNew',
                btnLabel: 'Dodaj wpis',
                formAction: '/encounter/add',
                navLocation: 'encounter',
                validationErrors: []
            });
        });
}

exports.showEditEncounterForm = (req, res, next) => {
    console.log(req.body);
    let allCams, allVehs;
    const encId = req.params.encId;
    CameraRepository.getCameras()
        .then(cams => {
            allCams = cams;
            return VehicleRepository.getVehicles();
        })
        .then(vehs => {
            allVehs = vehs;
            return EncounterRepository.getEncounterById(encId)
        })
        .then(enc => {
            let a = allVehs[0].registration.toString();
            let b = enc.Car_registration.toString();
            console.log(a + ' ' + b);
            console.log(a === b);
            res.render('pages/encounter/encounter-form', {
                enc: enc,
                allCams: allCams,
                allVehs: allVehs,
                formMode: 'edit',
                pageTitle: 'Edycja danych wpisu',
                btnLabel: 'Edytuj dane wpisu',
                formAction: '/encounter/edit',
                navLocation: 'encounter',
                validationErrors: []
            });
        });
};

exports.showEncounterDetails = (req, res, next) => {
    const encId = req.params.encId;
    let allCams, allVehs;
    console.log("Enc Controller, show encounter details for enc id: " + encId);
    CameraRepository.getCameras()
        .then(cams => {
            allCams = cams;
            return VehicleRepository.getVehicles();
        })
        .then(vehs => {
            allVehs = vehs;
            return EncounterRepository.getEncounterById(encId)
        })
        .then(enc => {
            res.render('pages/encounter/encounter-form', {
                enc: enc,
                allCams: allCams,
                allVehs: allVehs,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły wpisu',
                formAction: '',
                navLocation: 'encounter',
                validationErrors: []
            });
        });
}

exports.addEncounter = (req, res, next) => {
    const encData = { ...req.body };
    console.log("add encounter data BELOW\n" + encData);
    EncounterRepository.createEncounter(encData)
        .then( result => {
            res.redirect('/encounter');
        })
        .catch(err => {
            let allCams, allVehs;
            const error = err;
            const enc = {
                id: -1,
                Camera_id: -2,
                Car_registration: -3,
                authorized: 0,
                direction: 1
            }
            CameraRepository.getCameras()
                .then(cams => {
                    allCams = cams;
                    return VehicleRepository.getVehicles();
                })
                .then(vehs => {
                    allVehs = vehs;
                    res.render('pages/encounter/encounter-form', {
                        allCams: allCams,
                        allVehs: allVehs,
                        enc: enc,
                        pageTitle: 'Nowy wpis',
                        formMode: 'createNew',
                        btnLabel: 'Dodaj wpis',
                        formAction: '/encounter/add',
                        navLocation: 'encounter',
                        validationErrors: error.details
                    });
                });
        });
};

exports.updateEncounter = (req, res, next) => {
    const encId = req.body.id;
    let encData = { ...req.body };
    encData.Car_registration = "XXX";
    encData.Camera_id = 0;

    EncounterRepository.updateEncounter(encId, encData)
        .then( result => {
            res.redirect('/encounter');
        })
        .catch(err => {
            console.log(err.details);
            res.render('pages/encounter/encounter-form', {
                allCams: {},
                allVehs: {},
                enc: {},
                pageTitle: 'Nowy wpis',
                formMode: 'createNew',
                btnLabel: 'Dodaj wpis',
                formAction: '/encounter/add',
                navLocation: 'encounter',
                validationErrors: err.details
            });
        });
};

exports.deleteEncounter = (req, res, next) => {
    console.log("delete encounter");
    console.log(req.params);
    const encId = req.params.encId;
    EncounterRepository.deleteEncounter(encId)
        .then( () => {
            res.redirect('/encounter');
        });
};






