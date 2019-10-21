const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors')
const knex = require('./modules/pool');
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// get user based on id
app.get('/profile/:id', (req, res) => {
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

  // if (!found) {
  //   res.status(400).json('not found')
  // }

  // WAY NUMBER 2 OF LOOPING THROUGH OBJECT ARRAY
  // AND RETURNING USER.
  // for( let user of database.users) {
  //   if( user.id === id ) {
  //     res.send(user)
  //   } else {
  //     res.status(404).json('no user fount')
  //   }
  // }

}) // END OF APP.GET '/profile/:id'

// POST that checks if the user is registered and sign them in.
app.post('/signin', (req, res) => {
  //console.log(req.body)
  const { password, email } = req.body
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
            console.log(`error`)
          }) // end .catch
      } // end if 
    }) // end .then
    .catch( error => {
      res.status(500).json('wrong credentials')
    })


}) // end POST /signin

// POST when new user registers
app.post('/register', (req, res) => {

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

app.put('/image', (req, res) => {
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




// server is listening on localhost: 5000
app.listen(PORT, () => {
  console.log('app is running on port 5000')
})




