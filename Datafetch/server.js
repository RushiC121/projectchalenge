// server.js

const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Rootpassword',
  database: 'productdb',
  connectionLimit: 10
});

app.get('/fetchData', async (req, res) => {
  try {
    const query = 'SELECT * FROM productdb.new_table'; // Replace with your table name
    const [rows] = await pool.query(query);
    
   return console.log(res.json(rows));
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
