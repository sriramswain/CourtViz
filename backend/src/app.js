const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const pool = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// TODO: Import and use your routes here
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
