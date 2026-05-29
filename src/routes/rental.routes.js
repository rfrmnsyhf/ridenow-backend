const express = require('express');

const router = express.Router();

const rentalController = require('../controllers/rental.controller');

const authMiddleware = require('../middlewares/auth.middleware');

router.post(
  '/',
  authMiddleware,
  rentalController.create
);

router.get(
  '/',
  authMiddleware,
  rentalController.getAll
);

router.get(
  '/:id',
  authMiddleware,
  rentalController.getById
);

router.put(
  '/:id',
  authMiddleware,
  rentalController.updateStatus
);

router.delete(
  '/:id',
  authMiddleware,
  rentalController.delete
);

module.exports = router;