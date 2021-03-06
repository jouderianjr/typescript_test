import { DBOptions, GithubUser } from './module';
import * as R from 'ramda';
import * as pgPromise from 'pg-promise';

const createDbConnection = () =>  {
  // Limit the amount of debugging of SQL expressions
  const trimLogsSize : number = 200;

  // Actual database options
  const options : DBOptions = {
    user: 'lovely',
    password: 'lovely',
    host: 'localhost',
    database: 'lovelystay_test',
  };

  console.info('Connecting to the database:',
    `${options.user}@${options.host}:${options.port}/${options.database}`);

  const pgpDefaultConfig = {
    promiseLib: require('bluebird'),
    // Log all querys
    query(query) {
      console.log('[SQL   ]', R.take(trimLogsSize,query.query));
    },
    // On error, please show me the SQL
    error(err, e) {
      if (e.query) {
        console.error('[SQL   ]', R.take(trimLogsSize,e.query),err);
      }
    }
  };

  const pgp = pgPromise(pgpDefaultConfig);
  return pgp(options);
}

const createTable = (dbConnection) : PromiseLike<any> =>
  dbConnection.none('CREATE TABLE IF NOT EXISTS github_users (id BIGSERIAL, login TEXT, name TEXT, company TEXT, location TEXT)')

const insertGithubUser = (dbConnection, user : GithubUser) : PromiseLike<any> =>
  dbConnection.one('INSERT INTO github_users (login, name, company, location) VALUES ($[login], $[name], $[company], $[location]) RETURNING id', user);

const findGithubUserByLogin = (dbConnection, login : String) : PromiseLike<any> =>
  dbConnection.one('SELECT COUNT(*) from github_users where login = $1', login);

const getLisbonUsers = (dbConnection) : PromiseLike<Array<GithubUser>> =>
  dbConnection.query('SELECT * from github_users where location ILIKE \'%lisbon%\'');

const getUsersByLocation = (dbConnection) : PromiseLike<any> =>
  dbConnection.query('SELECT count(id), location from github_users GROUP BY location ORDER BY count(id) DESC');

export { createDbConnection, createTable, insertGithubUser, findGithubUserByLogin, getLisbonUsers, getUsersByLocation };