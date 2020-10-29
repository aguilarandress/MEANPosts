const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./config/database');
const colors = require('colors');

require('dotenv').config();

// Database connection
connectToDatabase();

const app = express();

// CORS middleware
app.use(cors());

// JSON request middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/posts', require('./routes/api/posts'));

// Run server on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`.yellow));
