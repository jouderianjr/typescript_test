import { DBOptions, GithubUsers } from './module';
import * as R from 'ramda';
import * as pgPromise from 'pg-promise';
import githubApi from './github-api';
import { createDbConnection, createTable, insertGithubUser } from './db-helpers';

const args = process.argv;

if( args.length !== 3 ) {
  console.error('Username parameter is missing');
  console.error('Command usage: npm run test -- username');
  process.exit(1);
}

const username : String = R.last(args);
const db = createDbConnection();

createTable(db)
  .then(() => githubApi.fetchUser(username))
  .then((data: GithubUsers) => insertGithubUser(db, data))
  .then(({id}) => console.log(id))
  .then(() => process.exit(0));