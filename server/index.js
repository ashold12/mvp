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

  const locationsParams = {
    url: `https://api.predicthq.com/v1/places/?q=${city}&limit=5`,
    headers: {
      Authorization: `Bearer ${TOKEN.TOKEN}`,
    },
  }
  axios.get(locationsParams.url, {headers: locationsParams.headers})
  .then(({ data }) => {
    let { results } = data;
    let final;
    for (entry of results) {
      if (entry.region === region) {
        final = entry
        break
      }
    }
    if (!final) final = results[0]
    let location = final.location

    let date = new Date();
    date = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();

    console.log(date);

    const eventParams = {
      url: `https://api.predicthq.com/v1/events`,
      headers: {
        Authorization: `Bearer ${TOKEN.TOKEN}`,
      },
      params: {
        'within': `100km@${location[1]},${location[0]}`,
        'category': 'concerts',
        'sort': 'start',
        'active.gte': date,
      },
    }

    return axios.get(eventParams.url, {headers: eventParams.headers, params: eventParams.params})
  })
  .then(({ data }) => res.send(data.results))
  .catch((err) => {
    console.log(err);
    res.status(500).send(err)
  })
})











app.listen(port, () => {
  console.log(`HI :) \nI'm listening on ${port}`)
});


