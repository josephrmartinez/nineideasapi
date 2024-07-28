# nineideas API

## Description

The nineideas API is a backend server for nineideas.net, a minimalist social network that encourages users to develop a daily habit of creating idea lists. This API is built using Node.js and Express.js, and it includes authentication, idea management, user sessions, and integration with OpenAI for content moderation.

The frontend repo is located here: https://github.com/josephrmartinez/nineideasfrontend

## Installation

Before running the nineideas API, you'll need to install its dependencies. Make sure you have [Node.js](https://nodejs.org/) installed on your system.

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

The nineideas API uses environment variables for configuration. Create a `.env` file in the project root directory and define the following variables:

- `MONGODB_URI`: MongoDB connection URI.
- `ACCESS_TOKEN`: Random alphanumeric string used to verify and decode the JWT token received in the token variable.
- `REFRESH_TOKEN`: Random alphanumeric string used to obtain a new access token without user reauthentication when the original token expires, facilitating seamless session management.
- `OPENAI_API_KEY`: Your OpenAI API key. Used for content moderation.

Example `.env` file:

```env
MONGODB_URI=mongodb+srv://user:password@cluster0.uxyz123.mongodb.net/?retryWrites=true&w=majority
ACCESS_TOKEN=7a4b3f9c0e1d26f8a92
REFRESH_TOKEN=9c1b7d3a5e4b68f2d1jd
OPENAI_API_KEY=sk-123abc
```

## Usage

Start the server:

```
npm run serverstart
```

The API will be available at `http://localhost:8080`.

## API Routes Documentation

### Idea Routes

**Create a New Idea**  
Endpoint: /ideas  
Method: POST  
Description: Create a new idea.  
Request Body:

```
{
   "text": "Idea text",
   "parentTopic": "Parent topic ID"
}
```

Response:

```
{
   "\_id": "Idea ID",
   "text": "Idea text",
   "parentTopic": "Parent topic ID"
}
```

**Update Idea by ID**  
Endpoint: /ideas/:id  
Method: PATCH  
Description: Update an existing idea by its ID.  
Request Body:

```
{
   "updates": {
   "field": "new value"
   }
}
```

Response:

```
{
   "nModified": Number of documents modified,
   "ok": 1,
   "n": Number of documents matched
}
```

### List Routes

**Get Lists by Page**  
Endpoint: /lists/page/:page  
Method: GET  
Description: Retrieve lists by page number, with each page containing 20 lists.  
Response:

```
[
   {
      "\_id": "List ID",
      "topic": "Topic ID",
      "ideas": ["Idea IDs"],
      "author": "Author ID",
      "timeStarted": "Timestamp",
      "timeCompleted": "Timestamp"
   },
   ...
]
```

**Create a New List**
Endpoint: /lists  
Method: POST  
Description: Create a new list.  
Request Body:

```
{
   "topic": "Topic ID",
   "ideas": ["Idea IDs"],
   "author": "Author ID",
   "timeStarted": "Timestamp"
}
```

Response:

```
{
   "\_id": "List ID",
   "topic": "Topic ID",
   "ideas": ["Idea IDs"],
   "author": "Author ID",
   "timeStarted": "Timestamp",
   "timeCompleted": "Timestamp"
}
```

**Get List by ID**  
Endpoint: /lists/:id  
Method: GET  
Description: Retrieve a list by its ID.  
Response:

```
{
   "\_id": "List ID",
   "topic": {
      "\_id": "Topic ID",
      "name": "Topic name"
   },
   "ideas": [
         {
         "_id": "Idea ID",
         "text": "Idea text"
         },
         ...
   ],
   "author": {
   "\_id": "Author ID",
   "username": "Author username"
   },
   "timeStarted": "Timestamp",
   "timeCompleted": "Timestamp"
}
```

**Update List by ID**  
Endpoint: /lists/:id  
Method: PUT  
Description: Update an existing list by its ID.  
Request Body:

```
{
   "field": "new value"
}
```

Response:

```
{
   "\_id": "List ID",
   "topic": "Topic ID",
   "ideas": ["Idea IDs"],
   "author": "Author ID",
   "timeStarted": "Timestamp",
   "timeCompleted": "Timestamp"
}
```

**Patch Update List by ID**  
Endpoint: /lists/:id  
Method: PATCH  
Description: Partially update an existing list by its ID.  
Request Body:

```
{
   "updates": {
      "field": "new value"
   }
}
```

Response:

```
{
   "\_id": "List ID",
   "topic": "Topic ID",
   "ideas": ["Idea IDs"],
   "author": "Author ID",
   "timeStarted": "Timestamp",
   "timeCompleted": "Timestamp"
}
```

**Delete List by ID**  
Endpoint: /lists/:id  
Method: DELETE  
Description: Delete an existing list by its ID.  
Response:

```
{
   "message": "List deleted successfully",
   "authorId": "Author ID"
}
```

**Content Moderation**  
Endpoint: /lists/check  
Method: POST  
Description: Check if the provided list of ideas contains readable content.  
Request Body:

```
{
   "ideaList": [
      {
         "text": "Idea text"
      },
      ...
   ]
}
```

Response:  
true or false

### Topic Routes

**Create a New Topic**  
Endpoint: /topics  
Method: POST  
Description: Create a new topic.  
Request Body:

```
{
   "name": "Topic name",
   "public": true or false
}
```

Response:

```
{
   "\_id": "Topic ID",
   "name": "Topic name",
   "public": true or false
}
```

**Get All Topics**  
Endpoint: /topics  
Method: GET  
Description: Retrieve all topics.  
Response:

```
[
   {
      "_id": "Topic ID",
      "name": "Topic name",
      "public": true or false
   },
   ...
]
```

**Get New Topic**  
Endpoint: /topics/new  
Method: GET  
Description: Retrieve a new random public topic.  
Response:

```
{
   "\_id": "Topic ID",
   "name": "Topic name",
   "public": true or false
}
```

**Get Topic by ID**  
Endpoint: /topics/:id  
Method: GET  
Description: Retrieve a topic by its ID.  
Response:

```
{
   "\_id": "Topic ID",
   "name": "Topic name",
   "public": true or false
}
```

**Delete Topic by ID**  
Endpoint: /topics/:id  
Method: DELETE  
Description: Delete a topic by its ID.  
Response:

```
{
   "message": "Topic deleted successfully"
}
```

### User Routes

**Register User**  
Endpoint: /users  
Method: POST  
Description: Register a new user.  
Request Body:

```
{
   "username": "Username",
   "password": "Password",
   "bio": "User bio"
}
```

Response:

```
{
   "\_id": "User ID",
   "username": "Username",
   "bio": "User bio",
   "createdAt": "Timestamp"
}
```

**User Login**  
Endpoint: /users/login  
Method: POST  
Description: Log in an existing user.  
Request Body:

```
{
   "username": "Username",
   "password": "Password"
}
```

Response:

```
{
   "success": true,
   "token": "JWT token"
}
```

**Get User by ID**  
Endpoint: /users/:id  
Method: GET  
Description: Retrieve a user by their ID.  
Response:

```
{
   "\_id": "User ID",
   "username": "Username",
   "bio": "User bio",
   "lists": [
      {
         "\_id": "List ID",
         "topic": {
         "\_id": "Topic ID",
         "name": "Topic name"
      },
         "ideas": ["Idea IDs"],
         "author": "Author ID",
         "timeStarted": "Timestamp",
         "timeCompleted": "Timestamp"
      },
      ...
   ],
   "currentStreak": Number,
   "completedLists": Number,
   "recordStreak": Number,
   "createdAt": "Timestamp"
}
```

**Patch Update User**  
Endpoint: /users/:id  
Method: PATCH  
Description: Partially update a user's details by their ID.  
Request Body:

```
{
   "field": "new value"
}
```

Response:

```
{
   "\_id": "User ID",
   "username": "Username",
   "bio": "User bio",
   "lists": ["List IDs"],
   "currentStreak": Number,
   "completedLists": Number,
   "recordStreak": Number,
   "createdAt": "Timestamp"
}
```

**Delete User by ID**  
Endpoint: /users/:id  
Method: DELETE  
Description: Delete a user by their ID.  
Response:

```
{
   "message": "User deleted successfully"
}
```

## License

This project is licensed under the MIT License.

## Author

josephm.dev

## Contributing

If you'd like to contribute to this project, please create a pull request.

## Issues

If you encounter any issues with the nineideas API, please open an issue.
