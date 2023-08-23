// server.js (Backend)

const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

// PostgreSQL setup
const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'todo_list_app',
  password: 'root',
  port: 5432,
});

// API routes
app.get('/todos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM todos');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/todos', async (req, res) => {
  const { text } = req.body;
  try {
    await pool.query('INSERT INTO todos (text) VALUES ($1)', [text]);
    res.json({ message: 'Todo added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// More routes for editing and deleting todos

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
