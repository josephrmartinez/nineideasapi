# NineIdeas API

## Description

The NineIdeas API is a backend server for nineideas.net, a minimalist social network that encourages users to develop a daily habit of creating idea lists. This API is built using Node.js and Express.js, and it includes authentication, idea management, user sessions, and integration with OpenAI for content moderation.

## Installation

Before running the NineIdeas API, you'll need to install its dependencies. Make sure you have [Node.js](https://nodejs.org/) installed on your system.

1. Clone this repository to your local machine:

   ```
   git clone https://github.com/your-username/nineideasapi.git
   ```

2. Navigate to the project directory:

   ```
   cd nineideasapi
   ```

3. Install the project dependencies using npm:

   ```
   npm install
   ```

## Configuration

The NineIdeas API uses environment variables for configuration. Create a `.env` file in the project root directory and define the following variables:

- `MONGODB_URI`: MongoDB connection URI.
- `ACCESS_TOKEN`: Random alphanumeric string used to verify and decode the JWT token received in the token variable.
- `REFRESH_TOKEN`: Random alphanumeric string used to obtain a new access token without user reauthentication when the original token expires, facilitating seamless session management.
- `OPENAI_API_KEY`: Your OpenAI API key.

Example `.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/nineideas
ACCESS_TOKEN=7a4b3f9c0e1d26f8a92
REFRESH_TOKEN=9c1b7d3a5e4b68f2d1jd
OPENAI_API_KEY=your-openai-api-key
```

## Usage

To start the server, you can use the following command:

```
npm run serverstart
```

The API will be available at `http://localhost:8080`.

## API Endpoints

The following are some of the API endpoints available in this project:

- `/api/idea`: Get a list of all ideas or create a new idea.
- `/api/idea/:id`: Get, update, or delete a specific idea by ID.
- `/api/users/login`: Authenticate a user and get an access token.
- `/api/users/logout`: Log out the currently authenticated user.
- `/api/users/`: Register a new user.
...


## Dependencies

- bcryptjs: ^2.4.3
- body-parser: ^1.20.2
- cookie-parser: ^1.4.6
- cors: ^2.8.5
- dotenv: ^16.3.1
- express: ^4.18.2
- express-async-handler: ^1.2.0
- express-session: ^1.17.3
- jsonwebtoken: ^9.0.1
- luxon: ^3.3.0
- mongoose: ^7.4.0
- openai: ^4.7.0
- passport: ^0.6.0
- passport-local: ^1.0.0

## Development Dependencies

- @flydotio/dockerfile: ^0.4.8
- nodemon: ^3.0.1

## License

This project is licensed under the MIT License.

## Author

josephm.dev

## Contributing

If you'd like to contribute to this project, please create a pull request.

## Issues

If you encounter any issues with the NineIdeas API, please open an issue on the [GitHub repository](https://github.com/your-username/nineideasapi).

## Acknowledgments

Special thanks to the open-source community and the authors of the libraries and packages used in this project.

---


