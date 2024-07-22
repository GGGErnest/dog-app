# Dog App

This project consists of two applications: an Angular frontend (dog-app) and an Express.js backend (dog-app-server).

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (latest LTS version recommended)
- npm (comes with Node.js)

## Project Structure

```
dog-app/
├── dog-app/             # Angular application
│   ├── src/             # Source files for the Angular app
│   ├── cypress/e2e/     # End-to-end tests
│   └── ...              # Other Angular project files
├── dog-app-server/      # Express.js server
│   ├── src/             # Source files for the Express server
│   └── ...              # Other server project files
├── README.md            # This file
└── LICENSE              # License file
```

## Quick start

1. Install the dependencies

   ```
   npm install
   ```

2. Run the following commands

   ```
   npm run intienv && npm run start
   ```

The first of the two previous commands creates a '.env' file from the '.env_template' file provided with some default configurations required by the server to run. These are the default settings.

```
 PORT=3000
 CACHE_EXPIRES_AFTER_MINUTES=240
 CACHE_LIMIT=3000
 CACHE_OLD_ITEMS_THRESHOLD_HOURS=3
 CACHE_CLEANING_FREQUENCY_MS=10000
 DEFAULT_PAGINATION_SIZE=10
 DEFAULT_SORT_DIR="desc"
```

**Be aware that running 'npm run intienv' command will replace the '.env' file on the server root folder, therefore is recommended to be executed only when setting up the project for first time.**

**The Angular app uses 'environments' files to define the URL to where to reach the Server, so in case the server is not running on the default port(3000 by default) make sure to adjust the URL accordingly in the file './dog-app/src/environments/environment.development.ts'.**

The second command will run both apps(Web App and Server) in parallel. In addition, the browser will open automatically at the configured host of the Web App.

## Additional commands

### Express Server Commands

- Build the server: `npm run build`
- Run tests: `npm test`

### Additional Angular App Commands

- Build the app: `npm run build`
- Run unit tests: `npm test`
- Run end-to-end tests: `npm run e2e`

## Development Workflow

1. Start the express server first.
2. Then start the angular application.
3. Make changes to the code as needed.
4. The Angular app will automatically reload when you save changes.
5. The server will reload on code changes too.

## Testing

### Angular Testing

- Run `npm test` in the dog-app directory to execute unit tests via Karma.
- Run `npm run e2e` to execute end-to-end tests via Cypress.

### Backend Testing

- Run `npm test` in the dog-app-server directory to execute tests using Mocha.

## Building for Production

### Express Server

Run `npm run build` in the backend directory. The compiled JavaScript files will be output to the `dist/` directory.

### Angular App

Run `npm run build --configuration production` in the dog-app directory. The build artifacts will be stored in the `dist/` directory. The environment file used will be the one placed in './dog-app/src/environments/environment.ts'

## License

This project is licensed under the MIT License. See the `LICENSE` file in the root directory of this project for the full license text.
