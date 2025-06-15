const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const {verifyAdmin} = require('../middlewares/authMiddleware');

router.get('/', verifyAdmin , adminController.adminDashboard);

module.exports = router;