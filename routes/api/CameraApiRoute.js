const express = require('express');
const router = express.Router();

const camApiController = require('../../api/CameraAPI');

router.get('/', camApiController.getCameras);
// router.get('/:empId', empApiController.getEmployeeById);
// router.post('/', empApiController.createEmployee);
// router.put('/:empId', empApiController.updateEmployee);
// router.delete('/:empId', empApiController.deleteEmployee);

module.exports = router;