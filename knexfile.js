// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'bookLibrary',
      user: 'Ian',
      password: '1#531Tob'
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'MentalHealthcare',
      user:     'Ian',
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
      database: 'my_db',
      user:     'username',
      password: 'password'
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
