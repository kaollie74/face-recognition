const express = require('express');
//const knex = require('../modules/pool');
const pool = require('../modules/pool2');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');


router.post ('/', (req,res) => {
  const { email, password, name } = req.body;
  const hash = bcrypt.hashSync(password);
  sqlText = `insert into "login" (email, password)
              Values($1, $2) returning id, email`;
  values1 = [email, hash]
  date = new Date();

  sqlText2 = `insert into "users" (name, email, login_id, joined)
              VALUES ($1, $2, $3, $4) returning name, email, entries, id`
  // values2 = [name, response.row[0].email, response.rows[0].id]



  if( !email || !password || !name ) {
    return res.send.json(`Error user not found`);
  }

 
    pool.query(sqlText, values1)
    .then(response => {
      console.log(response.rows[0]);
      pool.query(sqlText2, [name, response.rows[0].email, response.rows[0].id, date])
      .then(response => {
        //console.log(response);
        res.send(response.rows[0]);
      })
      .catch(error => {
        console.log(`error inserting into 'users'`, error)
        res.sendStatus(500);
      })
    })
    .catch(error => {
      console.log(`error inserting new user`, error);
      res.sendStatus(500)
    })

})

// router.post('/', (req, res) => {

//   // destructuring req.body values
//   const { email, password, name } = req.body
//   const hash = bcrypt.hashSync(password)
//   // run transaction function which inserts password and email into 
//   // table then returns email to insert into login table.
//   // if one fails, it all fails. 
//   if( !email || !password || !name ) {
//     return res.send.json(`Error user not found`);
//   }
//   knex.transaction(trx => {
//     trx.insert({
//       password: hash,
//       email: email
//     })
//       .into('login')
//       .returning('email')
//       .then(loginEmail => {
//         return trx('users')
//           .returning('*')
//           .insert({
//             email: loginEmail[0],
//             name: name,
//             joined: new Date()
//           })
//           .then(response => {
//             //res.status(200).json(database.users[database.users.length - 1])
//             res.json(response[0])
//           })
//       })
//       .then(trx.commit)
//       .catch(trx.rollback)
//   })

  // bcrypt.hash(password, null, null, function (err, hash) {
  //   // Store hash in your password DB.
  //   console.log(hash)
  // });

// })

module.exports = router;