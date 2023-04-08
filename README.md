# Social Network API

This is a Social Network API that allows users to create accounts, post thoughts, react to thoughts, and add friends to their friend list. The API is built using Node.js and Express, and uses a MongoDB database to store data.

## Installation

To install this API on your local machine, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the root directory of the project.
3. Run npm install to install the required dependencies.
4. Create a .env file and add the following variables:

```
MONGODB_URI=<your-mongodb-uri>
PORT=<your-preferred-port>
```

5. Run npm start to start the server.

## Usage

Once the server is running, you can test the API using a tool like Insomnia. The following routes are available:

### Users
    - GET /api/users - Get all users.
    - GET /api/users/:id - Get a specific user by ID.
    - POST /api/users - Create a new user.
    - PUT /api/users/:id - Update a user by ID.
    - DELETE /api/users/:id - Delete a user by ID.
    - POST /api/users/:userId/friends/:friendId - Add a friend to a user's friend list.
    - DELETE /api/users/:userId/friends/:friendId - Remove a friend from a user's friend list.

### Thoughts
    - GET /api/thoughts - Get all thoughts.
    - GET /api/thoughts/:id - Get a specific thought by ID.
    - POST /api/thoughts - Create a new thought.
    - PUT /api/thoughts/:id - Update a thought by ID.
    - DELETE /api/thoughts/:id - Delete a thought by ID.
    - POST /api/thoughts/:thoughtId/reactions - Add a reaction to a thought.
    - DELETE /api/thoughts/:thoughtId/reactions/:reactionId - Remove a reaction from a thought.

All routes return data in JSON format.


## Credits

This API was built by Jshi as part of a bootcamp challenge. It uses the following libraries:

- Node.js
- Express
- Mongoose
- dotenv