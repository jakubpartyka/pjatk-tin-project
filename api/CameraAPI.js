const CameraRepository = require('../repository/mysql2/CameraRepository');

exports.getCameras = (req, res, next) => {
    CameraRepository.getCameras()
        .then(cameras => {
            res.status(200).json(cameras);
        })
        .catch(err => {
            console.log(err);
        });
};


exports.getCameraById = (req, res, next) => {
    const camId = req.params.camId;
    CameraRepository.getCameraById(camId)
        .then(cam => {
            if(!cam) {
                res.status(404).json({
                    message: 'Camera with id: ' + camId + ' not found'
                })
            } else {
                res.status(200).json(cam);
            }
        });
};