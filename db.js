const knexfile = require('./knexfile')
const pg = require('pg-promise')()
require('dotenv').config()

const db =
  process.env.NODE_ENV === 'production' ? pg({
    connectionString: process.env.DATABASE_URL
  }) :
    pg({
      host: process.env.HOST,
      port: 5432,
      database: process.env.database,
      user: process.env.databaseUsername,
      password: process.env.databasePassword
    });

module.exports = db