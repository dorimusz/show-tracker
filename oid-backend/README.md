# OpenID

## System requirements:
- NodeJS
- npm

## Environment variables:
Create a .env file in root and copy the following variables' template into it:
- PORT={8080}
- HOST={http://localhost:3001}
- CONNECTION_STRING={mongodb://localhost:27017/custom-oid}
- JWT_SECRET={...}
- ADMIN_SECRET={...}
- LOGFLARE_SOURCE_ID={420}
- LOGFLARE_API_KEY={420}

## Dev start:
- npm install
- npm start
- starting with nodemon: npm run watch