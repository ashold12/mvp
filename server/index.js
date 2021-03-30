const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

app.get('/concerts', (req, res) => {
  //expect city parameter as string
  console.log(req.query)
  let thing = req.query
  res.send(thing)
})









app.listen(port, () => {
  console.log(`HI :) \nI'm listening on ${port}`)
});


