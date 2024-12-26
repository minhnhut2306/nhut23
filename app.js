require('dotenv').config();  
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const routes = require('./uploadimage'); 

app.use(express.json()); 
app.use(cors());  

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });


app.get('/', (req, res) => {
  res.send('Hello from app.js!');
});

app.use('/', routes);

app.use((err, req, res, next) => {
  console.error(err);  // Log the error
  res.status(500).send('Something went wrong!'); 
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
