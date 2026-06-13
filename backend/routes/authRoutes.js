const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const connectToDatabase = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Task 11: authRoutes.js containing implemented APIs for login, registration, and updating user information

// Register API
router.post('/register', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('users');
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password) {
      return res.status(400).send('Email and password are required');
    }

    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const newUser = { email, password, firstName, lastName };
    await collection.insertOne(newUser);

    const authtoken = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ authtoken });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Login API
router.post('/login', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('users');
    const { email, password } = req.body;

    const user = await collection.findOne({ email });

    if (user && user.password === password) {
      const authtoken = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ authtoken, userName: user.firstName, userEmail: user.email });
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Update user API
router.put('/update', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).send('Unauthorized');

    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) return res.status(403).send('Forbidden');

      const db = await connectToDatabase();
      const collection = db.collection('users');
      
      const { firstName, lastName } = req.body;
      const result = await collection.updateOne(
        { email: decoded.email },
        { $set: { firstName, lastName } }
      );

      res.json({ message: 'User updated successfully' });
    });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
