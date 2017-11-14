import * as R from 'ramda';
import { createDbConnection, getLisbonUsers } from './db-helpers';
import { GithubUser } from './module';

const showUsers = (users: Array<GithubUser>) => {
  console.log(`${users.length} user${users.length > 0? 's' : ''} found.`);
  console.log(
    users.reduce((acc, {login} : GithubUser) =>
      `${acc}${login}\n`
    , '')
  );
  process.exit(0);
}

const showLisbonUsers = db => {
  getLisbonUsers(db)
    .then(showUsers);
}

export default showLisbonUsers;