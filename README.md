# Airtribe News Aggregator

This repository consists of an API for a typical news aggregator which gives news based on user news preferences. It's part of my Airtribe Backend Engineering Launchpad Assignment.

### Prerequistes:
- NodeJS (v18 or newer)

### Installation:
- `npm install` - This will install all the dependencies of the application.
- `npm start` - This will start the application on port 3000.

### Running Tests:
- `npm run test` 

### Adding environment variables
Copy the content of the env-example and make a separate file known as .env and add the respective values of the env variables.
- BCRYPT_SALT - generate a salt of bcrypt and use it in the .env file
- NEWS_API_KEY - generate the api key. check https://newsapi.org/ for references.
- Generate your provate key for token generation and paste it in the file private-key.pem which is present in project root directory.

### Routes:
- POST /register: Register a new user.
- POST /login: Log in a user.
- GET /preferences: Retrieve the news preferences for the  logged-in user.
- PUT /preferences: Update the news preferences for the logged-in user.
- GET /news: Fetch news articles based on the logged-in user's preferences.

### Postman Collection
[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://god.gw.postman.com/run-collection/23240361-6219f7da-7d74-404f-95c4-677274533f23?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D23240361-6219f7da-7d74-404f-95c4-677274533f23%26entityType%3Dcollection%26workspaceId%3Dec1416e1-60a3-4ccd-81be-f2910322aa82)
