const express = require('express');
const knex = require('../modules/pool');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const Clarifai = require('clarifai');

require('dotenv').config();
const API_KEY = process.env.IMAGE
const app = new Clarifai.App({
  apiKey: API_KEY
});

router.post('/apiCall', (req, res) => {
  console.log('in /apicall', req.body.input);
  app.models.predict(
    Clarifai.FACE_DETECT_MODEL,
    req.body.input
  ).then(response => {
    console.log('response from api', response)
    res.send(response);
  })

})


router.put('/', (req, res) => {
  console.log('in /image', req.body.id)
 
  knex('users')
    .where({
      id: req.body.id
    })
    .increment('entries', 1)
    .returning('entries')
    .then(response => {
      res.send(response[0])
    })
    .catch(error => {
      res.sendStatus(500)

    })

}) // END OF APP.PUT '/image'

module.exports = router; 