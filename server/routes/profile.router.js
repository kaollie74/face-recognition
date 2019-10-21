const express = require('express');
const knex = require('../modules/pool');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');

// get user based on id
router.get('/:id', (req, res) => {
  console.log(`hit /profile/${req.params.id}`)
  const { id } = req.params;

  knex.select('*')
    .from('users')
    .where({ id: id })
    .then(response => {
      if (response.length) {
        //res.json(response[0]);
        res.send(response[0])
      } else {
        res.status(500, 'no user').json(`No User`)
      }
    })
    .catch(error => {
      res.sendStatus(500)
      console.log(`error from DB`);
    })

}) // END OF APP.GET '/profile/:id'

module.exports = router;