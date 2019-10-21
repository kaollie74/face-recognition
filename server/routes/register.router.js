const express = require('express');
const knex = require('../modules/pool');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');

router.post('/', (req, res) => {

  // destructuring req.body values
  const { email, password, name } = req.body
  const hash = bcrypt.hashSync(password)
  // run transaction function which inserts password and email into 
  // table then returns email to insert into login table.
  // if one fails, it all fails. 
  knex.transaction(trx => {
    trx.insert({
      password: hash,
      email: email
    })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date()
          })
          .then(response => {
            //res.status(200).json(database.users[database.users.length - 1])
            res.json(response[0])
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
  })

  bcrypt.hash(password, null, null, function (err, hash) {
    // Store hash in your password DB.
    console.log(hash)
  });

  // add a new user by using the .push() method
  // database.users.push({
  //   id: '3',
  //   name: name,
  //   email: email,
  //   entries: 0,
  //   joined: new Date()
  // })
  // send back status 200 and the object of the new user




})

module.exports = router;