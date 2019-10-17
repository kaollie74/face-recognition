
knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'kyleolson87',
    password : 'your_database_password',
    database : 'smart-brain'
  }
});

module.exports = knex;

