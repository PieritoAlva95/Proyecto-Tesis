const gql = require('graphql-tag');

module.exports = gql`
  type Oferta {
    id: ID!
    titulo: String!
    cuerpo: String!
    nombres: String
    apellidos: String
    numeroDeInteresados: Int
    paga: Float!
    categoria: String!
    creadoEn: String!
  }
  type Usuario {
    id: ID!
    nombres: String!
    apellidos: String!
    email: String!
    esAdmin: Boolean!
    token: String!
    creadoEn: String!
  }
  input RegistrarInput {
    nombres: String!
    apellidos: String!
    documentoDeIdentidad: String!
    numeroDeCelular: String!
    email: String!
    password: String!
    confirmarPassword: String!
  }
  type Query {
    getOfertas: [Oferta!]
    getOferta(ofertaId: ID!): Oferta
  }
  type Mutation {
    registarUsuario(registrarInput: RegistrarInput): Usuario!
    loginUsuario(email: String!, password: String!): Usuario!
    crearOferta(body: String!): Oferta!
    borrarOferta(ofertaId: ID!): String!
  }
`;
