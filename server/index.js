const express = require('express');
const axios = require('axios');
const path = require('path');

const TOKEN = require('../config.js');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

app.get('/concerts', (req, res) => {
  //expect city in query as string
  console.log(req.query)
  if (!('city' in req.query) || !('state' in req.query)) {
    res.status(400).send('invalid request')
  }
  const { city, region } = req.query

  const parameters = {
    url: `https://api.predicthq.com/v1/places/?q=${city}`,
    headers: {
      Authorization: `Bearer ${TOKEN.TOKEN}`,
    },
  }
  axios.get(parameters.url, {headers: parameters.headers}).then((response) => {
    res.send(response.data)
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send(err)
  })
})









app.listen(port, () => {
  console.log(`HI :) \nI'm listening on ${port}`)
});


