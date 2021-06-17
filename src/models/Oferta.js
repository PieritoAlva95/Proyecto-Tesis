const { model, Schema } = require('mongoose');

const OfertaSchema = new Schema(
  {
    usuario: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
    },
    titulo: {
      type: String,
      required: true,
    },
    cuerpo: {
      type: String,
      required: true,
    },
    nombres: {
      type: String,
    },
    apellidos: {
      type: String,
    },
    numeroDeInteresados: {
      type: Number,
      default: 0,
    },
    paga: {
      type: Number,
      required: true,
      default: 0.0,
    },
    categoria: {
      type: String,
      required: true,
    },
    interesados: [
      {
        usuario: {
          type: Schema.Types.ObjectId,
          ref: 'Usuario',
        },
      },
    ],
    creadoEn: {
      type: String,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

module.exports = model('Oferta', OfertaSchema);
