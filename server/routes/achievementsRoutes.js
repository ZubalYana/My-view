const express = require('express');
const router = express.Router();

router.post('/achievements-weekly', (req, res) => {
    console.log(req.body)
});

router.post('/achievements-monthly', (req, res) => {
    // Logic to handle monthly achievements
});

router.post('/achievements-yearly', (req, res) => {
    // Logic to handle yearly achievements
});

module.exports = router;