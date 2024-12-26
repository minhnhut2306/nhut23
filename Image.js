const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    secure_url: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return /^https?:\/\//.test(v);  
        },
        message: props => `${props.value} is not a valid URL!`,
      },
    },
    public_id: {
      type: String,
      required: true, 
    },
    uploaded_at: {
      type: Date,
      default: Date.now,
    },
  });
  
  const Image = mongoose.model('Image', imageSchema);
  
  module.exports = Image;
  