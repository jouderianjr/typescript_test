import * as R from 'ramda';
import insertUserCommand from './insert-user-command';
import showLisbonUsersCommand from './lisbon-users-command';

const showHelpMessage = () =>
  console.log(`
    Unknown Command.

    Command usage:
    npm run test insertUser {username}
    npm run test lisbonUsers
    npm run test lisbonStats
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

    default:
      return showHelpMessage();
  }
}


export default cli;