const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const authController = require('../controllers/authController.js');
// Get all doctors
router.get('/doctors', authController.authenticateToken, doctorController.getAllDoctors);

// Get a doctor by ID
router.get('/doctors/:id', authController.authenticateToken, doctorController.getDoctorById);

// Create a new doctor
router.post('/doctors', authController.authenticateToken, doctorController.createDoctor);

// Update a doctor
router.put('/doctors/:id', authController.authenticateToken, doctorController.updateDoctor);

// Delete a doctor
router.delete('/doctors/:id', authController.authenticateToken, doctorController.deleteDoctor);

module.exports = router;
