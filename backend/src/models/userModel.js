const pool = require('../config/db');

async function findByEmail(email) {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
}

async function createUser({ email, password, first_name, last_name, role }) {
  const result = await pool.query(
    'INSERT INTO users (email, password, first_name, last_name, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [email, password, first_name, last_name, role]
  );
  return result.rows[0];
}

module.exports = { findByEmail, createUser };

