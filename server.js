const express = require('express');
const path = require('path');
const cors = require('cors');
const colors = require('colors');
const connectToDatabase = require('./config/database');
// Load environment variables
require('dotenv').config();

// Database connection
connectToDatabase();

const app = express();

// CORS middleware
app.use(cors());

// JSON request middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup static files
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/users', require('./routes/api/users'));

// Run server on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`.yellow));
