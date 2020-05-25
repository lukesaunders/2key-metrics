// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: '2keymetrics',
      user:     'luke',
      timezone     : 'UTC',
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    // debug: true,
  },
  production: {
    client: 'pg',
    connection: {
      database: '2keymetrics',
      user:     '2key',
      password: 'metrics',
      timezone : 'UTC',
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    pool: {
      min: 2,
      max: 10
    }    
  },

};
