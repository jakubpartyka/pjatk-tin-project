const CameraRepository = require('../repository/mysql2/CameraRepository');

exports.showCameraList = (req, res, next) => {
    // res.render('pages/camera/camera-list', {navLocation: 'camera' });

    CameraRepository.getCameras()
        .then(cams => {
            res.render('pages/camera/camera-list', {
                cams: cams,
                navLocation: 'camera'
            });
        });
}

exports.showAddCameraForm = (req, res, next) => {
    console.log("show add camera form from cam controller");

    const validationErrors = [];

    res.render('pages/camera/camera-form', {
        cam: {},
        pageTitle: 'Dodaj nową kamerę',
        formMode: 'createNew',
        btnLabel: 'Dodaj',
        formAction: '/camera/add',
        navLocation: 'camera',
        validationErrors: validationErrors
    })
    console.log("finished");
}

exports.showEditCameraForm = (req, res, next) => {
    const camId = req.params.camId;
    CameraRepository.getCameraById(camId)
        .then(cam => {
            res.render('pages/camera/camera-form', {
                cam: cam,
                formMode: 'edit',
                pageTitle: 'Edycja danych kamery',
                btnLabel: 'Edytuj dane kamery',
                formAction: '/camera/edit',
                navLocation: 'camera'
            });
        });
};


exports.showCameraDetails = (req, res, next) => {
    // res.render('pages/camera/camera-info', {navLocation: 'camera'});

    const camId = req.params.camId;
    CameraRepository.getCameraById(camId)
        .then(cam => {
            res.render('pages/camera/camera-form', {
                cam: cam,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły kamery',
                formAction: '',
                navLocation: 'cam'
            });
        });
}

exports.addCamera = (req, res, next) => {
    console.log("add camera from cam controller");
    const camData = {...req.body};
    CameraRepository.createCamera(camData)
        .then(result => {
            res.redirect('/camera');
        })
        .catch(err => {
            console.log(err.details);
            res.render('pages/camera/camera-form', {
                cam: camData,
                pageTitle: 'Dodawanie Kamery',
                formMode: 'createNew',
                btnLabel: 'Dodaj kamerę',
                formAction: '/camera/add',
                navLocation: 'cam',
                validationErrors: err.details
            });
        });
};

exports.updateCamera = (req, res, next) => {
    console.log(req.body.id);
    const camId = req.body.id;
    const camData = {...req.body};
    CameraRepository.updateCamera(camId, camData)
        .then(result => {
            res.redirect('/camera');
        });
};

exports.deleteCamera = (req, res, next) => {
    const camId = req.params.camId;
    CameraRepository.deleteCamera(camId)
        .then(() => {
            res.redirect('/camera');
        });
};






