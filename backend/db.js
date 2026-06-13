const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = 'giftlink';

let dbInstance = null;

async function connectToDatabase() {
  if (dbInstance) {
    return dbInstance;
  }

  const client = new MongoClient(url);

  try {
    // Task 4: Submit the GitHub URL of the file db.js containing the MongoDB connection line using await client.connect()
    await client.connect();
    console.log('Connected successfully to server');
    
    dbInstance = client.db(dbName);
    return dbInstance;
  } catch (error) {
    console.error('Database connection failed', error);
    throw error;
  }
}

module.exports = connectToDatabase;
