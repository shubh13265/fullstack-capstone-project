const app = require('./app');
const connectToDatabase = require('./db');

// Task 8: index.js containing a line that imports the natural npm package.
const natural = require('natural');

const port = process.env.PORT || 3001;

async function startServer() {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

startServer();
