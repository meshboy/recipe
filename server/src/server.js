import express from 'express';
import setMiddleware from './middleware';
import { graphQLRouter } from './api';
import { connect } from './db';

const app = express();
connect();
setMiddleware(app);

const path = '/recipe'
graphQLRouter.applyMiddleware({ app, path});

export default app;


// import Koa from 'koa';
// import { graphqlUploadKoa } from 'graphql-upload';

// import setMiddleware from './middleware';
// import { graphQLRouter } from './api';
// import { connect } from './db';

// const app = new Koa().use(
//     graphqlUploadKoa({
//         maxFileSize: process.env.FILE_SIZE,
//         maxFiles: 1
//     })
// );
// connect();
// setMiddleware(app);

// const path = '/recipe'
// graphQLRouter.applyMiddleware({ app, path});

// export default app;