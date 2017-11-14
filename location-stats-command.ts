import * as R from 'ramda';
import { createDbConnection, getUsersByLocation } from './db-helpers';

const showUsers = (response: Array<any>) => {
  console.log('Result:');
  console.log(
    response.reduce((acc, {count, location}) =>
      `${acc}${count} - ${location || 'No location provided'}\n`
    , '')
  );
  process.exit(0);
}

const showLocationStats = db => {
  getUsersByLocation(db)
    .then(showUsers);
}

export default showLocationStats;