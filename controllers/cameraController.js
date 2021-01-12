const CameraRepository = require('../repository/mysql2/CameraRepository');

exports.showCameraList = (req, res, next) => {
    CameraRepository.getCameras()
        .then(cams => {
            res.render('pages/camera/camera-list', {
                cams: cams,
                errorMessage: 'none',
                navLocation: 'camera'
            });
        });
}

exports.showAddCameraForm = (req, res, next) => {
    res.render('pages/camera/camera-form', {
        cam: {},
        pageTitle: 'Dodaj nową kamerę',
        formMode: 'createNew',
        btnLabel: 'Dodaj',
        formAction: '/camera/add',
        navLocation: 'camera',
        validationErrors: []
    })

}

exports.showEditCameraForm = (req, res, next) => {
    const camId = req.params.camId;
    const validationErrors = [];
    CameraRepository.getCameraById(camId)
        .then(cam => {
            res.render('pages/camera/camera-form', {
                cam: cam,
                formMode: 'edit',
                pageTitle: 'Edycja danych kamery',
                btnLabel: 'Edytuj dane kamery',
                formAction: '/camera/edit',
                navLocation: 'camera',
                validationErrors: validationErrors
            });
        });
};


exports.showCameraDetails = (req, res, next) => {
    const validationErrors = [];
    const camId = req.params.camId;
    CameraRepository.getCameraById(camId)
        .then(cam => {
            res.render('pages/camera/camera-form', {
                cam: cam,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły kamery',
                formAction: '',
                navLocation: 'camera',
                validationErrors: validationErrors
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
                navLocation: 'camera',
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
        })
        .catch(err => {
            console.log(err.details);
            res.render('pages/camera/camera-form', {
                cam: camData,
                formMode: 'edit',
                pageTitle: 'Edycja danych kamery',
                btnLabel: 'Edytuj dane kamery',
                formAction: '/camera/edit',
                navLocation: 'camera',
                validationErrors: err.details
            });
        });
};

exports.deleteCamera = (req, res, next) => {
    const camId = req.params.camId;
    let errorMessage;
    CameraRepository.deleteCamera(camId)
        .then(() => {
            res.redirect('/camera');
        })
        .catch(err => {
            errorMessage = err.message;
            console.log("error occurred");
            return CameraRepository.getCameras()
                .then(cams => {
                    res.render('pages/camera/camera-error', {
                        cams: cams,
                        errorMessage: errorMessage,
                        navLocation: 'camera'
                    });
                })
        });
};






