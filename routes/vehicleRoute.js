const express = require('express');
const router = express.Router();

const cameraController = require('../controllers/vehicleController');

router.get('/', cameraController.showVehicleList);
router.get('/add', cameraController.showAddVehicleForm);
router.get('/details/:vehId', cameraController.showVehicleDetails);

module.exports = router;