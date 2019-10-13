const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* 
    singin route = POST 
    register route = POST = return user object
    /profile/:userid = GET = user
    /image = PUT = updated user object

*/

const database = {
  user: [ {
    id: '1',
    name: 'kyle',
    email: 'kyle.com',
    password: 'blah',
    entries: 0,
    joined: new Date()
  },
  {
    id: '2',
    name: 'Jeep',
    email: 'jeep.com',
    password: 'cookies',
    entries: 0,
    joined: new Date()
  }

]
}

app.post('/signin', (req, res) => {
  if(req.body.email === database.user[0]. email && req.body.password === database.user[0].password) {
      res.json('success')
  } else {
    res.status(500).json('error logging in')
  }
  
  console.log(req.body)
})
  


app.get('/', (req, res) => {
  res.send('this is working');
})

app.listen(PORT, ()=> {
  console.log('app is running on port 5000')
})

