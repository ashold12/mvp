import axios from 'axios'
let url = 'http://127.0.0.1:3000/concerts'

const handler = {
  getEvents: (city, state, cb) => {
    axios.get(`${url}?city=${city}&state=${state}`)
    .then((results) => cb(results))
    .catch((err) => console.error(err));
  }
}

export default handler