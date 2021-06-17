const ofertasResolvers = require('./ofertas');
const usuariosResolvers = require('./usuarios');

module.exports = {
  Query: {
    ...ofertasResolvers.Query,
  },
  Mutation: {
    ...usuariosResolvers.Mutation,
  },
};
