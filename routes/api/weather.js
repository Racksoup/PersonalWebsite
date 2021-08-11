const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  const forecast = await axios.get(
    'https://api.openweathermap.org/data/2.5/weather?q=Ottawa,ca&APPID=5892035cc2ec047af9b8a3ee8d181525'
  );
  res.json(forecast.data);
  console.log(forecast.data);
});

module.exports = router;
