const { AuthenticationError } = require('apollo-server');

const jwt = require('jsonwebtoken');
const { LLAVE_SECRETA } = require('../../config');

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // Bearer ....
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const usuario = jwt.verify(token, LLAVE_SECRETA);
        return usuario;
      } catch (error) {
        throw new AuthenticationError('Token Invalido/Expirado');
      }
    }
    throw new Error("El token de autenticación debe ser 'Bearer [token]'");
  }
  throw new Error('Se debe proporcionar el header de autorización');
};
