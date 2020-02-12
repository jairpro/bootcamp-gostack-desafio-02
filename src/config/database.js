/*
const env = process.env.NODE_ENV || 'development';
const config = require('./config.json')[env];

module.exports = config;
*/
/*
module.exports = {
  dialect: 'mysql',
  host: 'localhost',
  // host: '127.0.0.1',
  // port: '3306',
  username: 'fastfeet',
  password: 'fastfeet',
  database: 'gostack_fastfeet_development',
  // timezone: '-03:00',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
  dialectOptions: {
    // useUTC: false, // for reading from database
    // useUTC: true, // for reading from database
    dateStrings: true,
    typeCast: true,
  },
  timezone: '-03:00', // for writing to database
};
*/
/*
import { development } from './config.json';

export default development;
*/
const config = require('./config.json');

const nodeEnv = process.env.NODE_ENV || 'development';
const configEnv = config[nodeEnv];
if (nodeEnv === 'development') {
  configEnv.dialect = process.env.DB_DEVELOPMENT_DIALECT;
  configEnv.host = process.env.DB_DEVELOPMENT_HOST;
  configEnv.port = process.env.DB_DEVELOPMENT_PORT;
  configEnv.database = process.env.DB_DEVELOPMENT_DATABASE;
  configEnv.user = process.env.DB_DEVELOPMENT_USER;
  configEnv.password = process.env.DB_DEVELOPMENT_PASSWORD;
} else if (nodeEnv === 'test1') {
  configEnv.dialect = process.env.DB_TEST1_DIALECT;
  configEnv.host = process.env.DB_TEST1_HOST;
  configEnv.port = process.env.DB_TEST1_PORT;
  configEnv.database = process.env.DB_TEST1_DATABASE;
  configEnv.user = process.env.DB_TEST1_USER;
  configEnv.password = process.env.DB_TEST1_PASSWORD;
} else if (nodeEnv === 'test2') {
  configEnv.dialect = process.env.DB_TEST2_DIALECT;
  configEnv.host = process.env.DB_TEST2_HOST;
  configEnv.port = process.env.DB_TEST2_PORT;
  configEnv.database = process.env.DB_TEST2_DATABASE;
  configEnv.user = process.env.DB_TEST_USER;
  configEnv.password = process.env.DB_TEST2_PASSWORD;
} else if (nodeEnv === 'test3') {
  configEnv.dialect = process.env.DB_TEST3_DIALECT;
  configEnv.host = process.env.DB_TEST3_HOST;
  configEnv.port = process.env.DB_TEST3_PORT;
  configEnv.database = process.env.DB_TEST3_DATABASE;
  configEnv.user = process.env.DB_TEST3_USER;
  configEnv.password = process.env.DB_TEST3_PASSWORD;
}
if (nodeEnv === 'production') {
  configEnv.dialect = process.env.DB_PRODUCTION_DIALECT;
  configEnv.host = process.env.DB_PRODUCTION_HOST;
  configEnv.port = process.env.DB_PRODUCTION_PORT;
  configEnv.database = process.env.DB_PRODUCTION_DATABASE;
  configEnv.user = process.env.DB_PRODUCTION_USER;
  configEnv.password = process.env.DB_PRODUCTION_PASSWORD;
}
module.exports = configEnv;
