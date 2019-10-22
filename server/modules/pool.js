
knex = require('knex')({
  client: 'pg',
  connection: {
    host : process.env.DATABASE_URL || '127.0.0.1',
    ssl: true,
    user : 'kyleolson87',
    password : 'your_database_password',
    database : 'smart-brain'
  }
});

module.exports = knex;

