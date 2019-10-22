const express = require('express');
//const knex = require('../modules/pool');
pool = require('../modules/pool2');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');

router.post('/', (req, res) => {
  console.log('in signin router', req.body);
  const { email, password } = req.body

  sqlText = `SELECT * from login WHERE "email"= $1`;
  sqlText2 = `select users.id, login.id as login_id,  users.name, login.email, entries from users
  join login on login.id = login_id
  where login.email = $1;`
  value1 = [email];

  // check to see if a password or email exist in the req.body.
  // if it doesn't it'll return and stop the function.
  // if (!email || !password) {
  //   return res.send.json(`error user not found`)
  // }

  // run query to DB
  pool.query(sqlText, value1)
    .then(response => {
      console.log(response.rows[0]);
      // check to see if passwords match in DB to req.body
      const Valid = bcrypt.compareSync(password, response.rows[0].password)
      if (Valid) {
        pool.query(sqlText2, value1)
          .then(response => {
            //console.log('in response before sending back to client', response.rows[0]);
            res.send(response.rows[0]);
          })
          .catch(error => {
            res.sendStatus(500);
            console.log(`error retrieving from db`, error);
          })

      } else {
        res.status(500).json('Incorrect email or password')
      }


    }) // end .then

}) // end router.post

// router.post('/', (req, res) => {
//   console.log('in router.post /signin', req.body)
//   const { password, email } = req.body

//   if( !email || !password ) {
//     return res.send.json(`Error user not found`);
//   }

//   knex.select('email', 'password')
//     .from('login')
//     .where('email', '=', email)
//     .then(response => {
//       console.log(response[0].password)
//       const Valid = bcrypt.compareSync(password, response[0].password)
//       if (Valid) {
//         knex.select('*')
//           .from('users')
//           .where('email', '=', email)
//           .then(response => {
//             res.send(response[0])
//           }) //  end .then
//           .catch(error => {
//             res.sendStatus(500);
//             console.log(`error`, error)
//           }) // end .catch
//       } // end if 
//     }) // end .then
//     .catch( error => {
//       res.status(500).json('wrong credentials')
//     })


// }) // end POST /signin

module.exports = router;