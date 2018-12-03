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