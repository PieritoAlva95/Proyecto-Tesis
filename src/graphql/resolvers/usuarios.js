const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const sendgridTransport = require('nodemailer-sendgrid-transport');
const nodemailer = require('nodemailer');

const {
  validarRegistrarInput,
  validarLoginInput,
  validarReseteoPasswordInput,
} = require('../../util/validadores');
const { LLAVE_SECRETA, API_KEY_MAILS } = require('../../../config');
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
    async resetearPassword(_, { email }) {
      const { errors, valid } = validarReseteoPasswordInput(email);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const usuario = await Usuario.findOne({ email });

      if (!usuario) {
        errors.general = 'Usuario no encontrado.';
        throw new UserInputError('Usuario no encontrado.', { errors });
      }

      const passwordNueva = Math.floor(100000 + Math.random() * 900000) + '';
      passwordEncriptada = await bcrypt.hash(passwordNueva, 12);

      Usuario.findOneAndUpdate(
        { _id: usuario._id },
        { password: passwordEncriptada },
        (error) => {
          if (error) {
            errors.general = 'Ha ocurrido un error en el cambio de contraseña.';
            throw new UserInputError(
              'Ha ocurrido un error en el cambio de contraseña.',
              { errors }
            );
          } else {
            const transporter = nodemailer.createTransport(
              sendgridTransport({
                auth: {
                  api_key: API_KEY_MAILS,
                },
              })
            );

            let mailOptions = {
              to: email,
              from: 'jpalvaradoc@unl.edu.ec',
              subject: 'Cambio de contraseña Jobs - Trabajos 24/7',
              html: `
                <table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#2d3436" bgcolor="#2d3436">
                  <tr height="200px">
                    <td bgcolor="" width="600"px>
                      <h1 style="color: #fff; text-align:center">Cambio de Contraseña</h1>
                      <p style="color:#fff; text-align:center">
                        <span style:"color: #fff">Se ha cambiado tu contraseña, puedes acceder con tu</span><br>
                        <span style:"color: #fff">correo: ${email} y tu nueva contraseña: ${passwordNueva}</span><br><br>
                        <span style:"color: #fff"><b>NO TE OLVIDES DE ACTUALIZAR TU CONTRASEÑA CUANDO VUELVAS A INGRESAR A LA PLATAFORMA</b></span><br>
                      </p>
                    </td>
                  </tr>
              
                  <tr bgcolor="#fafafa">
                    <td style="text-align:center">
                      <p><a href="#">Inicia Sesión en Trabajos 24/7</a></p>
                    </td>
                  </tr>
              
                </table>
                `,
            };

            transporter.sendMail(mailOptions, (err) => {
              if (err) {
                errors.general =
                  'Ha ocurrido un problema en el envio del correo.';
                throw new UserInputError(
                  'Ha ocurrido un problema en el envio del correo.',
                  { errors }
                );
              }
            });
          }
        }
      );

      return passwordNueva;
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

      const transporter = nodemailer.createTransport(
        sendgridTransport({
          auth: {
            api_key: API_KEY_MAILS,
          },
        })
      );

      let mailOptions = {
        to: email,
        from: 'jpalvaradoc@unl.edu.ec',
        subject: 'Bienvenido a Jobs - Trabajos 24/7',
        html: `
        <table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#2d3436" bgcolor="#2d3436">
          <tr height="200px">
            <td bgcolor="" width="600"px>
              <h1 style="color: #fff; text-align:center">Bienvenido</h1>
              <p style="color:#fff; text-align:center">
                <span style:"color: #fff">Se ha registrado tu cuenta ${Nombres}, puedes acceder con</span><br>
                <span style:"color: #fff">correo: ${email} y tu contraseña</span><br>
              </p>
            </td>
          </tr>
      
          <tr bgcolor="#fafafa">
            <td style="text-align:center">
              <p><a href="#">Inicia Sesión en Trabajos 24/7</a></p>
            </td>
          </tr>
      
        </table>
        `,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          throw new UserInputError(
            'Ha ocurrido un problema en el envio del correo.'
          );
        }
      });

      const token = generarToken(res);
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
