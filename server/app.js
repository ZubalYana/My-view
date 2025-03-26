const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv').config();
const authMiddleware = require('./middleware/authMiddleware');

//import Routes


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());

//use Routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
