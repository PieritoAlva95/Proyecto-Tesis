const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB, PUERTO } = require('../config');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('(MongoDB) Base de datos conectada...');
    return server.listen({ port: PUERTO });
  })
  .then((res) => {
    console.log(`El servidor esta corriendo en ${res.url}`);
  });
