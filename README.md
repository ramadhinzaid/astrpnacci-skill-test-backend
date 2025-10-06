
# Astronacci Skill Test Backend

This is a simple backend application for the Astronacci skill test. It is built with Express.js and TypeScript, and it uses Firebase for authentication and database services.

## Features

*   User authentication (register, login, logout, change password)
*   User management (get users, get user by id, update user, update user photo)
*   Modular structure
*   Standardized API response format

## Getting Started

1.  Clone the repository.
2.  Install the dependencies: `npm install`
3.  Create a `.env` file and add the following environment variables:
    ```
    FIREBASE_SERVICE_ACCOUNT_KEY_PATH=path/to/your/serviceAccountKey.json
    ```
4.  Replace the placeholder database URL in `src/config/firebase.ts` with your actual Firebase database URL.
5.  Build the project: `npm run build`
6.  Start the server: `npm start`
