const express = require('express');
const router = express.Router();
const connectToDatabase = require('../db');

// Task 6: searchRoutes.js containing code to filter items by category

// GET /api/search?name=...&category=...
router.get('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('gifts');
    
    let query = {};

    // Filter by name (optional)
    if (req.query.name) {
      query.name = { $regex: req.query.name, $options: 'i' };
    }

    // Filter by category (optional)
    if (req.query.category) {
      query.category = req.query.category;
    }

    const gifts = await collection.find(query).toArray();
    res.json(gifts);
  } catch (error) {
    console.error('Error searching gifts:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
