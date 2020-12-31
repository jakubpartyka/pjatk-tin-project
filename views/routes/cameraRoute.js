const express = require('express');
const router = express.Router();

const cameraController = require('../controllers/cameraController');

router.get('/', cameraController.showCameraList);
router.get('/add', cameraController.showAddCameraForm);
router.get('/details/:camId', cameraController.showCameraDetails);

module.exports = router;