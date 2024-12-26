const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    secure_url: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return /^https?:\/\//.test(v);  // Basic validation for URLs
        },
        message: props => `${props.value} is not a valid URL!`,
      },
    },
    public_id: {
      type: String,
      required: true,  // public_id is required to delete or update the image on Cloudinary
    },
    uploaded_at: {
      type: Date,
      default: Date.now,
    },
  });
  
  const Image = mongoose.model('Image', imageSchema);
  
  module.exports = Image;
  