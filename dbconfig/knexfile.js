// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'test1',
      user:     'postgres',
      password: 'Stronghold2'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migration'
    },
    seeds: {
      directory:"./seeds"
    }
  },


};
