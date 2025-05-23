const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv').config();
const authMiddleware = require('./middleware/authMiddleware');
const swaggerDocs = require('./swaggerConfig');

//import Routes
const authRoutes = require('./routes/authRoutes');
const achievementsRoutes = require('./routes/achievementsRoutes');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());

//use Routes
app.use('/auth', authRoutes);
app.use('/achievements', achievementsRoutes);


swaggerDocs(app);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
