const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');
const verifyRole = require('../middleware/role');
const serviceController = require('../controllers/serviceController');
require('dotenv').config();

// Registrar administrador (solo accesible para administradores)
router.post('/register-admin', auth, verifyRole('admin'), async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = new User({
            username,
            email,
            password: bcrypt.hashSync(password, 10),
            role: 'admin'
        });
        await user.save();
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error registering admin', error: err.message });
    }
});
// Obtener todos los usuarios (solo accesible para administradores)
router.get('/users', auth, verifyRole('admin'), async (req, res) => {
    console.log('Authenticated Admin:', req.user);  // Log del usuario administrador
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
});

// Actualizar un usuario (solo accesible para administradores)
router.put('/users/:id', auth, verifyRole('admin'), async (req, res) => {
    const { id } = req.params;
    const { username, email, password, role } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, { username, email, password, role }, { new: true });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error updating user', error: err.message });
    }
});

// Eliminar un usuario (solo accesible para administradores)
router.delete('/users/:id', auth, verifyRole('admin'), async (req, res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user', error: err.message });
    }
});

// Crear servicio (solo administrador)
router.post('/services', auth, verifyRole('admin'), serviceController.createService);

// Obtener todos los servicios
router.get('/services', serviceController.getAllServices);

// Actualizar servicio (solo administrador)
router.put('/services/:id', auth, verifyRole('admin'), serviceController.updateService);

// Eliminar servicio (solo administrador)
router.delete('/services/:id', auth, verifyRole('admin'), serviceController.deleteService);

// Obtener todas las reservas (solo accesible para administradores)
router.get('/bookings', auth, verifyRole('admin'), async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user').populate('service');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching bookings', error: err.message });
    }
});
// Crear una nueva reserva (solo accesible para administradores)
router.post('/bookings', auth, verifyRole('admin'), async (req, res) => {
    const { userId, serviceId, date, timeSlot } = req.body;
    console.log('Creating booking with:', { userId, serviceId, date, timeSlot });
    try {
        const booking = new Booking({
            user: userId,
            service: serviceId,
            date,
            timeSlot
        });
        await booking.save();
        res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (err) {
        console.error('Error creating booking:', err);
        res.status(500).json({ message: 'Error creating booking', error: err.message });
    }
});

// Actualizar una reserva (solo accesible para administradores)
router.put('/bookings/:id', auth, verifyRole('admin'), async (req, res) => {
    const { id } = req.params;
    const { userId, serviceId, date } = req.body;
    try {
        const booking = await Booking.findByIdAndUpdate(id, { user: userId, service: serviceId, date }, { new: true });
        res.json(booking);
    } catch (err) {
        res.status(500).json({ message: 'Error updating booking', error: err.message });
    }
});

// Eliminar una reserva (solo accesible para administradores)
router.delete('/bookings/:id', auth, verifyRole('admin'), async (req, res) => {
    const { id } = req.params;
    try {
        await Booking.findByIdAndDelete(id);
        res.json({ message: 'Booking deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting booking', error: err.message });
    }
});
module.exports = router;
