// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'MentalHealth',
      user: 'Ian',
      password: '1#531Tob'
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'MentalHealth',
      user: 'Ian',
      password: '1#531Tob'
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
    connection: {
      database: 'MentalHealth',
      user: process.env.databaseUsername,
      password: process.env.DatabasePassword
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
