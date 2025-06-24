const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const pool = require('../config/db');

const signup = async (req, res) => {
  try {
    const { email, password, first_name, last_name, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ error: 'Email, password, and role are required.' });
    }
    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.createUser({ email, password: hashedPassword, first_name, last_name, role });
    res.status(201).json({ message: 'User created successfully', user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }
    const user = await userModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    // Check if the selected role matches the user's role
    if (role && user.role !== role) {
      return res.status(401).json({ error: `Account is registered as a ${user.role}.` });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user.id, role: user.role, firstName: user.first_name }, process.env.JWT_SECRET, { expiresIn: '7d' });
    // Optionally, store token in auth_tokens table
    await pool.query('INSERT INTO auth_tokens (user_id, token, expires_at) VALUES ($1, $2, NOW() + interval \'7 days\')', [user.id, token]);
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { signup, login };
