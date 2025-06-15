const express = require('express');
const router = express.Router();
const reserveController = require('../controllers/reserveController');

router.post('/', reserveController.createReservation);

module.exports = router;