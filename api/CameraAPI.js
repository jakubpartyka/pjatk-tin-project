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