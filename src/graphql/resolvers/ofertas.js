const { AuthenticationError, UserInputError } = require('apollo-server');

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
    async borrarOferta(_, { ofertaId }, context) {
      const usuario = verificarAuth(context);
      try {
        const oferta = await Oferta.findById(ofertaId);
        if (!oferta) {
          throw new Error('Oferta no encontrada.');
        }
        if (usuario.id === String(oferta.usuario)) {
          await oferta.delete();
          return 'Oferta eliminada';
        } else {
          throw new AuthenticationError('Acción no permitida.');
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async interesadoEnOferta(_, { ofertaId }, context) {
      const usuario = verificarAuth(context);

      const oferta = await Oferta.findById(ofertaId);

      if (oferta) {
        if (
          oferta.interesados.find(
            (interesado) => String(interesado.usuario) === usuario.id
          )
        ) {
          // Si ya esta agregado a los interesados, lo eliminará
          oferta.interesados = oferta.interesados.filter(
            (interesado) => String(interesado.usuario) !== usuario.id
          );
        } else {
          // Si no esta agregado, lo añadira
          oferta.interesados.push({
            usuario: usuario.id,
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            creadoEn: new Date().toISOString(),
          });
        }
        await oferta.save();
        return oferta;
      } else throw new UserInputError('Post not found');
    },
  },
};
