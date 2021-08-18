const ofertasResolvers = require('./ofertas');
const usuariosResolvers = require('./usuarios');

module.exports = {
  Oferta: {
    numeroDeInteresados: (parent) => parent.interesados.length,
  },
  Query: {
    ...ofertasResolvers.Query,
  },
  Mutation: {
    ...usuariosResolvers.Mutation,
    ...ofertasResolvers.Mutation,
  },
};
