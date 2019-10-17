const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors')
const knex = require('./modules/pool');
const PORT = process.env
  .PORT || 5000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

/* 
    singin route = POST 
    register route = POST = return user object
    /profile/:userid = GET = user
    /image = PUT = updated user object

*/

const database = {
  users: [{
    id: 1,
    name: 'kyle',
    email: 'kyle.com',
    password: 'kyle',
    entries: 0,
    joined: new Date()
  },
  {
    id: '2',
    name: 'Jeep',
    email: 'jeep.com',
    password: 'jeep',
    entries: 0,
    joined: new Date()
  }
  ],
  login: [
    {
      id: '1',
      hash: '',
      email: 'kyle.com'
    }
  ]

}

knex.select('*').from('users').then(data => {
  console.log(data);
});

app.get('/profile/:id', (req, res) => {
  console.log(`hit /profile/${req.params.id}`)
  const { id } = req.params;
  let found = false;
  knex.select('*')
    .from('users')
    .where({ id: id })
    .then(response => {
        //res.json(response[0]);
        res.send(response[0]) 
    })
    .catch( error => {
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
  console.log(req.body)
  const { password, email } = req.body
  // // Load hash from your password DB.
  // bcrypt.compare(password, hash, function (err, res) {
  //   // res == true'
  //   console.log('first guess', res);
  // });
  // bcrypt.compare('veggies', hash, function (err, res) {
  //   // res = false
  //   console.log('second guess', res)
  // });

  if (email === database.users[0].email && password === database.users[0].password) {
    res.json(database.users[0])
  } else {
    //res.status(500).json('error logging in')
    res.send('incorrect password')
  }

})

// POST when new user registers
app.post('/register', (req, res) => {

  // destructuring req.body values
  const { email, password, name } = req.body

  knex('users')
    .returning('*')
    .insert({
      email: email,
      name: name,
      joined: new Date()
    })
    .then(response => {
      //res.status(200).json(database.users[database.users.length - 1])
      res.json(response[0])
    })
    .catch(error => {
      res.status(500)
        .json(`unable to register`)
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
  console.log('in /image', req.body)
  // const { id } = req.body;
  let found = false;

  database.users.forEach(user => {
    if (user.id === req.body.id) {
      found = true;
      user.entries++
      return res.json(user.entries)

    } // end if 

  }) // end forEach

  if (!found) {
    res.status(400).json('not found')
  } // END if 


}) // END OF APP.PUT '/image'





app.get('/', (req, res) => {
  res.send(database.users);
})

app.listen(PORT, () => {
  console.log('app is running on port 5000')
})




