
import { ApolloServer, gql } from 'apollo-server-express';
import merge from 'lodash.merge'

import { userType, userResolvers } from './resources/user';
import { recipeType, recipeResolvers } from './resources/recipe';
import { fileType } from './resources/file';

const typeDefs = gql`${userType}${recipeType}${fileType}`;

export const graphQLRouter = new ApolloServer(
    {
        typeDefs,
        resolvers: merge({}, userResolvers, recipeResolvers),
        context: ({req, res})=> ({ user: req.user })
    }
);