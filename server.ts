import { DBOptions, GithubUsers } from './module';
import * as R from 'ramda';
import * as pgPromise from 'pg-promise';
import * as Promise from 'bluebird';
import githubApi from './github-api';
import { createDbConnection, createTable, insertGithubUser, findGithubUserByLogin } from './db-helpers';

const errorHandler = (reason:String) => {
  console.error(reason);
  process.exit(1);
}

const fetchAndInsertUser = (db, username) =>
  githubApi
    .fetchUser(username)
    .then((data: GithubUsers) => insertGithubUser(db, data));


const missingUsernameError = () =>
  errorHandler(`
    Username parameter is missing
    Command usage: npm run test -- username
  `);

const getUsernameFromArguments = (args : Array<String>) =>
  R.cond([
    [args => R.equals(args.length)(3), R.last],
    [R.T, missingUsernameError]
  ])(args);

const username : String = getUsernameFromArguments(process.argv);
const db = createDbConnection();

createTable(db)
  .then(() => findGithubUserByLogin(db, username))
  .then(({count}) =>
    R.cond([
      [R.equals('0'), () => fetchAndInsertUser(db, username)],
      [R.T, () => errorHandler('User already exists')]
    ])(count)
  )
  .then(() => process.exit(0));