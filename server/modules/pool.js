
// const knex = require('knex')({
//   client: 'pg',
//   connection: {
//     connectionString : process.env.DATABASE_URL,
//     ssl: true,
//   }
// });

const pg = require('pg');
const url = require('url');

let config = {};

if (process.env.DATABASE_URL) {
  // Heroku gives a url, not a connection object
  // https://github.com/brianc/node-pg-pool
  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true, // heroku requires ssl to be true
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };
} else {
  config = {
   
  client: 'pg',
  connection: {
    host : 'localhost',
    database : 'smart-brain'
  }
  };
}

// this creates the pool that will be shared by all other modules
const knex = require('knex')
const knex2 = new knex(config);

// the pool will log when it connects to the database
knex2.on('connect', () => {
  console.log('Postgesql connected');
});

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
knex2.on('error', (err) => {
  console.log('Unexpected error on idle client', err);
  process.exit(-1);
});

// const knex = require('knex')({
//   client: 'pg',
//   connection: {
//     host : '127.0.0.1',
//     user : 'kyleolson87',
//     password : 'your_database_password',
//     database : 'smart-brain'
//   }
// });

module.exports = knex2;

