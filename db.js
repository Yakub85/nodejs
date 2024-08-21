const mongoose = require('mongoose');

// Define the mongoose connection URL
const mongoURL = 'mongodb://localhost:27017/hotels';

// Set up MongoDB Connection
mongoose.connect(mongoURL)
  
  
const db = mongoose.connection;

// Event listeners
db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

// Export the database connection
module.exports = db;
