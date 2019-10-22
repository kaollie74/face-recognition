const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const bcrypt = require('bcrypt-nodejs');
const cors = require('cors')
//const knex = require('./modules/pool');
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Imported routes
const profileRouter = require('./routes/profile.router');
const signinRouter = require('./routes/signin.router');
const registerRouter = require('./routes/register.router');
const imageRouter = require('./routes/image.router');

// Routes
app.use('/profile/:id', profileRouter);
app.use('/signin', signinRouter);
app.use('/register', registerRouter);
app.use('/image', imageRouter);

console.log('this is process.env', process.env)


// server is listening on localhost: 5000
app.listen(PORT, () => {
  console.log('app is running on port 5000')
})




