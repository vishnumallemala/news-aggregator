# News Aggregator

## Installation

Start with cloning this repo on your local machine:

```sh
$ git clone https://github.com/vishnumallemala/news-aggregator.git
$ cd news-aggregator
```

To install dependencies, run:

```sh
$ npm ci
```

## Usage

### Serving the app

```sh
$ npm start
```

The application is running on [localhost](http:localhost:3000/).

### Running the tests

```sh
$ npm test
```

## API

1. **POST /users/register** - Creates a new user.
2. **POST /users/login** - Validates the user and returns a jwt.
3. **GET /users/preferences** - Retrieves user preferences of a registered user.
4. **PUT /users/preferences** - Updates user prefferences of the loggedin user.
5. **GET /news** - Retrieves today's news based on the user preference form gnews external api.
