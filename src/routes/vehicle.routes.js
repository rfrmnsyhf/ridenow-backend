const express = require('express');

const router = express.Router();

const vehicleController = require('../controllers/vehicle.controller');

const authMiddleware = require('../middlewares/auth.middleware');

router.post(
  '/',
  authMiddleware,
  vehicleController.create
);

router.get(
  '/',
  vehicleController.getAll
);

router.get(
  '/:id',
  vehicleController.getById
);

router.put(
  '/:id',
  authMiddleware,
  vehicleController.update
);

router.delete(
  '/:id',
  authMiddleware,
  vehicleController.delete
);

module.exports = router;
