const mongoose = require('mongoose');
const colors = require('colors');

/**
 * Creates connection to MongoDB database
 */
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('Connected to MongoDB...'.blue.bold);
  } catch (err) {
    console.error(err);
  }
}

module.exports = connectToDatabase;
