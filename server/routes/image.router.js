const express = require('express');
const knex = require('../modules/pool');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');


router.put('/', (req, res) => {
  console.log('in /image', req.body.id)
  // const { id } = req.body;
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