const Oferta = require('../../models/Oferta');

module.exports = {
  Query: {
    async getOfertas() {
      try {
        const ofertas = await Oferta.find();
        return ofertas;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getOferta(_, { ofertaId }) {
      try {
        const oferta = await Oferta.findById(ofertaId);
        if (oferta) {
          return oferta;
        } else {
          throw new Error('Oferta no encontrada');
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async crearOferta(_, {}, context) {},
  },
};
