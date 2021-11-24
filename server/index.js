const path = require('path');
const express = require('express');
const compression = require('compression');
const axios = require('axios');
// const { API_TOKEN, CAMPUS } = require('../config.js');

// const apiURL = `https://app-hrsei-api.herokuapp.com/api/fec2/${CAMPUS}/`;
const sdcURL = 'http://localhost:3000';

const app = express();

app.use(compression());

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use((req, res) => {
  axios({
    method: req.method,
    url: req.url,
    baseURL: sdcURL,
    data: req.body,
    // headers: {
    //   Authorization: API_TOKEN,
    // },
  })
    .then((response) => {
      res.status(response.status).send(response.data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.listen(3100, console.log('Connected to the island'));
