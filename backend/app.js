const express = require('express');
const cors = require('cors');

const giftRoutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/gifts', giftRoutes);
// Task 7: app.js that includes a route serving /api/search
app.use('/api/search', searchRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('GiftLink API Backend');
});

module.exports = app;
