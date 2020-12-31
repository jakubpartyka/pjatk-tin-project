exports.showCameraList = (req, res, next) => {
    res.render('pages/camera/camera-list', {navLocation: 'camera' });
}

exports.showAddCameraForm = (req, res, next) => {
    res.render('pages/camera/camera-form', {navLocation: 'camera'});
}

exports.showCameraDetails = (req, res, next) => {
    res.render('pages/camera/camera-info', {navLocation: 'camera'});
}




