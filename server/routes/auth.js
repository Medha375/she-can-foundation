const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const router = express.Router();

// POST — Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await admin.comparePassword(password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id, username }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.json({ token, username });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST — Seed admin (run once, then remove in production)
router.post('/seed', async (req, res) => {
  try {
    const exists = await Admin.findOne({ username: 'admin' });
    if (exists) return res.json({ message: 'Admin already exists' });
    await Admin.create({ username: 'admin', password: 'shecan2024' });
    res.json({ message: 'Admin created: admin / shecan2024' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;