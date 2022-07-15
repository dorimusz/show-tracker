# Full Stack API Exam Project: Series Tracker Site

The repository contains the front and server code for a TV show episode tracker application I created as a CodeCool exam project.

## Summary of the project:
The project's goal is to make it possible for registered users to organize and keep track of their TV shows and series in an administrative system. The following functions are implemented: \
    - Register and login third-party accounts (Google, my openid which is also included in this repository, however not part of the project) \
    - Personalized user profile. \
    - Browsing unlimited series by title. Needed a reliable APIs to fetch and load the list of series: https://www.tvmaze.com/  \
    - Browsing is available to anonymous/not logged in users as well.  \
    - Opening and showing series' details, aired and upcoming episodes.  \
    - Requests to adding new shows, previous requests can be viewed.  \
    - Logged in user can add series to the private watchlist (not visible for other users).  \
    - The user can track the seen episodes connected to a series (show progress).  \

## Main technologies used:
React (JavaScript ES6, react-router, Hooks) \
Node.js (express.js) \
MongoDB (mongoose) \
Axios (HTTP client) \
Jest (mongodb-memory-server, supertest, mocked data) \
Swagger 

## User personas: 
1. User story #1: User1 is a casual TV show watcher. Fancies series since +15 years, however is bad at keeping track of the episodes. Sometimes skips more than one season or just stops at the middle of it for years. Later cannot know where to pick it up, what episode is the next one.
2. User story #2: User2 tries to track a series that cannot be found anywhere, also tries to figure out when the next episode will be aired. The user is able to request a new series to appear on the site (if possible any ways).
3. User story #3: For user3 watching series is like a hobby. Beside tracking his show progression, also interested in finding new ones, moreover to see a seasons' details at one place like title, seasons and episodes with their air date, duration, source or channel and status.

## High fidelity wireframe:
https://www.figma.com/file/GxlmaqZrrNTeK2ZhSQSAmR/Track-My-Series?node-id=0%3A1

## Swagger documentation:
...

## Starting the application
### Start the program with Visual Studio Code or any other IDE
The following steps are essential to start the code::

#### 1. step
Clone the repository and open it with Visual Studio Code or any other IDE.

#### 2. step
Terminal commands to start with:
```
cd backend
npm install
cd ..
cd frontend
npm install
cd ..
```

#### 3. step
The backend folder contains the code of the API, running on Express.js. In order to make it work,a .env file is needed to be set up in the root folder containing the following values:
```
- PORT={4000}
- HOST={http://localhost:3000}
- CONNECTION_STRING={mongodb://localhost:27017/DB-name}
- JWT_SECRET={...}
- GOOGLE_CLIENT_ID={...}
- GOOGLE_CLIENT_SECRET={...}
- GOOGLE_REDIRECT_URI={http://localhost:3000/callback/google}

To utilize the errorHandler middleware, Logflare needs to be configured with the following values:
- LOGFLARE_SOURCE_ID={...}
- LOGFLARE_API_KEY={...}
```
#### 4. step
Google account or custom openid(extra step) account is required to login. After login all functions are available.

#### 5. step
To start the program do the following steps:
```
cd frontend
npm start
cd ..
cd backend
npm start
cd ..
```

#### Extra step
In case  you want to use the custom made provider for sign up or log in, be aware the following:
1. oid-backend should run on port 8080 locally.
2. oid-frontend should run on port 3001.
3. Both folders need npm install and npm start.
4. It's just a basic app, no validation done.
```
cd oid-frontend
npm start
cd ..
cd oid-backend
npm start
cd ..
```