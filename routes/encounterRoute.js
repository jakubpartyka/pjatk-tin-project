const express = require('express');
const router = express.Router();

const cameraController = require('../controllers/encounterController');

router.get('/', cameraController.showEncounterList);
router.get('/add', cameraController.showAddEncounterForm);
router.get('/details/:encId', cameraController.showEncounterDetails);

module.exports = router;