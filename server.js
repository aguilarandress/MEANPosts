const express = require('express');
const path = require('path');
const cors = require('cors');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectToDatabase = require('./config/database');

// Load environment variables
dotenv.config();

// API Routes
const postRoutes = require('./routes/api/posts');
const userRoutes = require('./routes/api/users');
const authRoutes = require('./routes/api/auth');

// Database connection
connectToDatabase();

const app = express();

// CORS middleware
app.use(cors());

// JSON request middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Morgan middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Setup static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes configuration
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Run server on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`.yellow));
