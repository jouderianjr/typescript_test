import * as R from 'ramda';
import { createDbConnection, getLisbonUsers } from './db-helpers';
import { GithubUsers } from './module';

const showUsers = (users: Array<GithubUsers>) => {
  console.log(`${users.length} user${users.length > 0? 's' : ''} found.`);
  console.log(
    users.reduce((acc, {login} : GithubUsers) =>
      `${acc}${login}\n`
    , '')
  );
  process.exit(0);
}

const showLisbonUsers = () => {
  const db = createDbConnection();
  getLisbonUsers(db)
    .then(showUsers);
}

export default showLisbonUsers;