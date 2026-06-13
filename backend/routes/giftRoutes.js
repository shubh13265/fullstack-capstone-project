const express = require('express');
const router = express.Router();
const connectToDatabase = require('../db');
const { ObjectId } = require('mongodb');

// Task 5: giftRoutes.js that includes a database connection using connectToDatabase() and routes serving /api/gifts and /api/gifts/:id

// GET /api/gifts - Get all gifts
router.get('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('gifts');
    const gifts = await collection.find({}).toArray();
    res.json(gifts);
  } catch (error) {
    console.error('Error fetching gifts:', error);
    res.status(500).send('Internal Server Error');
  }
});

// GET /api/gifts/:id - Get a specific gift by ID
router.get('/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('gifts');
    const id = req.params.id;
    const gift = await collection.findOne({ _id: new ObjectId(id) }); // Assuming _id is ObjectId, adjust if it's string in your data
    
    if (gift) {
      res.json(gift);
    } else {
      res.status(404).send('Gift not found');
    }
  } catch (error) {
    console.error('Error fetching gift:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Add a new gift
router.post('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('gifts');
    const result = await collection.insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
