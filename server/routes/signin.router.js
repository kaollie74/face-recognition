const express = require('express');
const knex = require('../modules/pool');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');

router.post('/', (req, res) => {
  console.log('in router.post /signin', req.body)
  const { password, email } = req.body

  if( !email || !password ) {
    return res.send.json(`Error user not found`);
  }

  knex.select('email', 'password')
    .from('login')
    .where('email', '=', email)
    .then(response => {
      console.log(response[0].password)
      const Valid = bcrypt.compareSync(password, response[0].password)
      if (Valid) {
        knex.select('*')
          .from('users')
          .where('email', '=', email)
          .then(response => {
            res.send(response[0])
          }) //  end .then
          .catch(error => {
            res.sendStatus(500);
            console.log(`error`, error)
          }) // end .catch
      } // end if 
    }) // end .then
    .catch( error => {
      res.status(500).json('wrong credentials')
    })


}) // end POST /signin

module.exports = router;