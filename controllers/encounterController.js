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
    res.render('pages/encounter/encounter-form', {
        allCams: {},
        allVehs: {},
        enc: {},
        pageTitle: 'Nowy wpis',
        formMode: 'createNew',
        btnLabel: 'Dodaj wpis',
        formAction: '/encounter/add',
        navLocation: 'encounter'
    });
}

exports.showEditEncounterForm = (req, res, next) => {
    console.log(req.body);
    let allCams, allVehs;
    const encId = req.params.encId;
    EncounterRepository.getEncounterById(encId)
        .then(enc => {
            res.render('pages/encounter/encounter-form', {
                enc: enc,
                allCams: {},
                formMode: 'edit',
                pageTitle: 'Edycja danych wpisu',
                btnLabel: 'Edytuj dane wpisu',
                formAction: '/encounter/edit',
                navLocation: 'encounter'
            });
        });
};



exports.showEncounterDetails = (req, res, next) => {
    const encId = req.params.encId;
    let allCams, allVehs;
    console.log("Enc Controller, show encounter details for enc id: " + encId);
    EncounterRepository.getEncounterById(encId)
        .then(enc => {
            res.render('pages/encounter/encounter-form', {
                enc: enc,
                allCams: {},
                formMode: 'showDetails',
                pageTitle: 'Szczegóły wpisu',
                formAction: '',
                navLocation: 'encounter'
            });
        });
}

exports.addEncounter = (req, res, next) => {
    console.log("add encounter data BELOW");
    console.log(req.body);
    const encData = { ...req.body };
    EncounterRepository.createEncounter(encData)
        .then( result => {
            res.redirect('/encounter');
        });
};

exports.updateEncounter = (req, res, next) => {
    console.log(req.body.id);
    const encId = req.body.id;
    const encData = { ...req.body };
    EncounterRepository.updateEncounter(encId, encData)
        .then( result => {
            res.redirect('/encounter');
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






