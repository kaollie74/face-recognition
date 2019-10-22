
knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'postgresql-shallow-13980',
    user : 'kyleolson87',
    password : 'your_database_password',
    database : 'smart-brain'
  }
});

module.exports = knex;

