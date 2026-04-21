const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if(err) {
    console.log('DB Error:', err);
  } else {
    console.log('MySQL Connected!');
  }
});

app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  db.query('INSERT INTO users (name, email, password) VALUES (?,?,?)',
    [name, email, hashed],
    (err, result) => {
      if(err) return res.status(400).json({ error: err.message });
      res.json({ message: 'User registered successfully' });
    }
  );
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if(err || results.length === 0)
      return res.status(400).json({ error: 'User not found' });
    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if(!match) return res.status(400).json({ error: 'Wrong password' });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, name: user.name, userId: user.id });
  });
});

app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if(err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/api/cart', (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  db.query('INSERT INTO cart (user_id, product_id, quantity) VALUES (?,?,?)',
    [user_id, product_id, quantity],
    (err, result) => {
      if(err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Added to cart' });
    }
  );
});

app.get('/api/cart/:user_id', (req, res) => {
  const { user_id } = req.params;
  db.query(
    'SELECT cart.id, products.name, products.price, cart.quantity FROM cart JOIN products ON cart.product_id = products.id WHERE cart.user_id = ?',
    [user_id],
    (err, results) => {
      if(err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

app.delete('/api/cart/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM cart WHERE id = ?', [id], (err) => {
    if(err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Removed from cart' });
  });
});

app.listen(process.env.PORT, () => {
  console.log('Server running on port ' + process.env.PORT);
});