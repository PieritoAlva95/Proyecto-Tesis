const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const {
  validarRegistrarInput,
  validarLoginInput,
} = require('../../util/validadores');
const { LLAVE_SECRETA } = require('../../../config');
const Usuario = require('../../models/Usuario');

function generarToken(usuario) {
  return jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
    },
    LLAVE_SECRETA,
    { expiresIn: '1h' }
  );
}

module.exports = {
  Mutation: {
    async loginUsuario(_, { email, password }) {
      const { errors, valid } = validarLoginInput(email, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const usuario = await Usuario.findOne({ email });

      if (!usuario) {
        errors.general = 'Usuario no encontrado.';
        throw new UserInputError('Usuario no encontrado.', { errors });
      }

      const match = await bcrypt.compare(password, usuario.password);

      if (!match) {
        errors.general = 'Crendenciales equivocados.';
        throw new UserInputError('Crendenciales equivocados.', { errors });
      }

      const token = generarToken(usuario);

      return {
        ...usuario._doc,
        id: usuario._id,
        token,
      };
    },
    async registarUsuario(
      _,
      {
        registrarInput: {
          nombres,
          apellidos,
          documentoDeIdentidad,
          numeroDeCelular,
          email,
          password,
          confirmarPassword,
        },
      }
    ) {
      //Validar data del usuario
      const { valid, errors } = validarRegistrarInput(
        nombres,
        apellidos,
        documentoDeIdentidad,
        numeroDeCelular,
        email,
        password,
        confirmarPassword
      );

      if (!valid) {
        throw new UserInputError('Errores', { errors });
      }
      // Asegurarnos que el usuasio no exista en la base de datos
      const usuario = await Usuario.findOne({ email });

      if (usuario) {
        throw new UserInputError('El correo ya esta registrado', {
          errors: {
            email:
              'Este correo electronico ya esta registrado en la plataforma ',
          },
        });
      }
      //Hash password and create an auth token
      password = await bcrypt.hash(password, 12);
      const nuevoUsuario = new Usuario({
        nombres,
        apellidos,
        documentoDeIdentidad,
        numeroDeCelular,
        email,
        password,
        creadoEn: new Date().toISOString(),
      });

      const res = await nuevoUsuario.save();

      const token = generarToken(res);
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
