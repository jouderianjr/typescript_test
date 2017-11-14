import * as R from 'ramda';
import insertUserCommand from './insert-user-command';
import showLisbonUsersCommand from './lisbon-users-command';
import showLocationStats from './location-stats-command';

const showHelpMessage = () =>
  console.log(`
    Unknown Command.

    Command usage:
    npm run test insertUser {username}
    npm run test lisbonUsers
    npm run test locationStats
 `);

const cli = (args: Array<String>) => {
  const mainCommand = R.head(args);

  switch (mainCommand) {
    case 'insertUser':
      if (args.length === 2) {
        return insertUserCommand(R.last(args))
      }
      showHelpMessage();
      break;

    case 'lisbonUsers':
      return showLisbonUsersCommand();

    case 'locationStats':
      return showLocationStats();

    default:
      return showHelpMessage();
  }
}


export default cli;