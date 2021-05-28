
# University Bus Management Platform

A University bus management platform for administrations and students to check bus status and details.

## Installation

1. Clone the repository.
2. Run the command `npm install`
3. Run MongoDB on local machine with the command `mongod --directoryperdb --dbpath /Users/<username>/data/db`
4. Run the project with the command `npm start`

## Development

- For development, Please install nodemon with `npm install -g nodemon`
- Run the command for auto-restarting development mode `npm run nodemon`

### Technology

- Node.js
- TypeScript
- Express
- MongoDB / Mongoose
- Typedi
- mongoose-validation-error-transform
- Redis


## Redis - Caching

We are using Redis for database caching.

- Install redis on your local machine, for mac `brew install redis`
- Run the command `brew services start redis`
- Check if Redis is running `brew services list` or `redis-cli` and write `ping` if response come as `PONG` it mean it is working.


### API Docs

You can find out more regarding the working API documentation at the following URL
`https://documenter.getpostman.com/view/1999203/TzK2bEeY`
