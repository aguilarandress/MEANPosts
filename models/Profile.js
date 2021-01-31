const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  lastName: {
    type: String,
    required: true,
  },
  biography: {
    type: String,
    required: true,
  },
  interests: [
    {
      type: String,
    },
  ],
  twitterAccount: {
    type: String,
    required: false,
  },
  instagramAccount: {
    type: String,
    required: false,
  },
  facebookAccount: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('profiles', ProfileSchema);
