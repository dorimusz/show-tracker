# TV show/Series tracker server

## System requirements:
- NodeJS
- npm

## Environment variables:
Create a .env file in root and copy the following variables' template into it:
- PORT={4000}
- HOST={http://localhost:3000}
- CONNECTION_STRING={mongodb://localhost:27017/DB-name}
- JWT_SECRET={...}
- GOOGLE_CLIENT_ID={...}
- GOOGLE_CLIENT_SECRET={...}
- GOOGLE_REDIRECT_URI={http://localhost:3000/callback/google}
- LOGFLARE_SOURCE_ID={...}
- LOGFLARE_API_KEY={...}

## Dev start:
- npm install
- npm start
- starting with nodemon: npm run watch