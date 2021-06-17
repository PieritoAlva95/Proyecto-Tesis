const Oferta = require('../../models/Oferta');
const verificarAuth = require('../../util/validarAutorizacion');

module.exports = {
  Query: {
    async getOfertas() {
      try {
        const ofertas = await Oferta.find().sort({ creadoEn: -1 });
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
    async crearOferta(
      _,
      { crearOfertaInput: { titulo, cuerpo, paga, categoria } },
      context
    ) {
      const usuario = verificarAuth(context);
      console.log(usuario);

      const nuevaOferta = new Oferta({
        usuario: usuario.id,
        titulo,
        cuerpo,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        paga,
        categoria,
        creadoEn: new Date().toISOString(),
      });

      const oferta = await nuevaOferta.save();
      return oferta;
    },
  },
};
