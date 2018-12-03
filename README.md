## A Recipe Application to demonstrate how to use GraphQL to query a data built with NodeJs for server side and VueJs for client side

## Project Setup

create .env in the server folder and add with

```
PORT=3000
MONGO_URI="mongodb://root@localhost/recipe"
TOKEN_SECRET="recipe-secret"
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

### Server

```
yarn install && yarn start
```

### Client

```
yarn install && yarn serve
```
