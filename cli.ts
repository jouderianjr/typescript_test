import * as process from 'process';
import * as R from 'ramda';
import insertUserCommand from './insert-user-command';
import showLisbonUsersCommand from './lisbon-users-command';
import showLocationStats from './location-stats-command';

const showHelpMessage = () => {
  console.log(`
    Unknown Command.

    Command usage:
    npm run test insertUser {username}
    npm run test lisbonUsers
    npm run test locationStats
 `);
 process.exit(0);
}

const cli = (args: Array<String>, db) => {
  const mainCommand = R.head(args);

  switch (mainCommand) {
    case 'insertUser':
      if (args.length === 2) {
        return insertUserCommand(R.last(args), db)
      }
      showHelpMessage();
      break;

    case 'lisbonUsers':
      return showLisbonUsersCommand(db);

    case 'locationStats':
      return showLocationStats(db);

    default:
      return showHelpMessage();
  }
}


export default cli;