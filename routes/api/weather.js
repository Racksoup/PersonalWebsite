const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const forecast = await axios.get(
      'https://api.openweathermap.org/data/2.5/forecast?q=Ottawa,ca&appid=5892035cc2ec047af9b8a3ee8d181525'
    );
    res.json(forecast.data);
    console.log(forecast.data);
  } catch (err) {
    console.log(err.message);
  }
});

router.get('/one-call', async (req, res) => {
  try {
    const weather = await axios.get(
      'https://api.openweathermap.org/data/2.5/onecall?lat=47.53&lon=-77.64&exclude=alerts&appid=5892035cc2ec047af9b8a3ee8d181525'
    );
    res.json(weather.data);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
