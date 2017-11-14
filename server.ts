import cli from './cli';
import { createTable, createDbConnection } from './db-helpers';

const args = process.argv.slice(2);


const db = createDbConnection();

createTable(db)
  .then(() => cli(args, db));