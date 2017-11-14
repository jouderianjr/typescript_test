import * as R from 'ramda';
import { GithubUsers } from './module';
import { createDbConnection, createTable, insertGithubUser, findGithubUserByLogin } from './db-helpers';
import githubApi from './github-api';

const errorHandler = (reason:String) => {
  console.error(reason);
}

const missingUsernameError = () =>
  errorHandler(`
    Username parameter is missing
    Command usage: npm run test -- username
  `);

const fetchAndInsertUser = (db, username) =>
  githubApi
    .fetchUser(username)
    .then((data: GithubUsers) => insertGithubUser(db, data));

const insertUser = (username : String) => {
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
}

export default insertUser;