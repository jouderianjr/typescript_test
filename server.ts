import { DBOptions, GithubUsers } from './module';
import * as R from 'ramda';
import * as pgPromise from 'pg-promise';
import githubApi from './github-api';

const args = process.argv;

if( args.length !== 3 ) {
  console.error('Username parameter is missing');
  console.error('Command usage: npm run test -- username');
  process.exit(1);
}

const username : String = R.last(args);

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
const db = pgp(options);

db.none('CREATE TABLE IF NOT EXISTS github_users (id BIGSERIAL, login TEXT, name TEXT, company TEXT)')
.then(() => githubApi.fetchUser(username))
.then((data: GithubUsers) => db.one(
  'INSERT INTO github_users (login) VALUES ($[login]) RETURNING id', data)
).then(({id}) => console.log(id))
.then(() => process.exit(0));
