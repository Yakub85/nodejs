const mongoose = require('mongoose');
require('dotenv').config();

// Define the mongoose connection URL
const mongoURL = process.env.LOCAL_URL;
// const mongoURL =process.env.DB_URL;
  

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
