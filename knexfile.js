// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: process.env.database,
      user: process.env.databaseUsername,
      password: process.env.databasePassword
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: process.env.database,
      user: process.env.databaseUsername,
      password: process.env.databasePassword
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL
//     {
//       database: process.env.database,
//       user: process.env.databaseUsername,
//       password: process.env.DatabasePassword
//     },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
