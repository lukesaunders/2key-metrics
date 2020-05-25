import Knex from 'knex';
const environment = process.env.NODE_ENV || 'development'
import knexfile from '../knexfile.js';
const config = knexfile[environment];
const knex = Knex(config);
export default knex;
