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

## Setting Up the Server (Express.js Server)

1. Navigate to the dog-app-server directory:

   ```
   cd dog-app-server
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up the environment variables:

   - Locate the `.env_template` file in the dog-app-server directory.
   - Make a copy of this file and rename it to `.env`.
   - Open the `.env` file and adjust any configurations as needed.

4. Start the development server:

   ```
   npm run start
   ```

   The server will start, and you can access it at `http://localhost:3000/` (or whichever port you've configured).

### Additional Express Server Commands

- Build the server: `npm run build`
- Run tests: `npm test`

## Setting Up the Web App (Angular App)

1. Navigate to the dog-app directory:

   ```
   cd dog-app
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm run start
   ```

   The application will be available at `http://localhost:4200/`.

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

Run `npm run build` in the dog-app directory. The build artifacts will be stored in the `dist/` directory.

## License

This project is licensed under the MIT License. See the `LICENSE` file in the root directory of this project for the full license text.
