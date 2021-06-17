const gql = require('graphql-tag');

module.exports = gql`
  type Interesado {
    id: ID!
    usuario: ID!
    nombres: String!
    apellidos: String!
    creadoEn: String!
  }
  type Oferta {
    id: ID!
    usuario: ID!
    titulo: String!
    cuerpo: String!
    nombres: String
    apellidos: String
    numeroDeInteresados: Int
    paga: Float!
    categoria: String!
    interesados: [Interesado]!
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
  input CrearOfertaInput {
    titulo: String!
    cuerpo: String!
    paga: Float!
    categoria: String!
  }
  type Query {
    getOfertas: [Oferta!]
    getOferta(ofertaId: ID!): Oferta
  }
  type Mutation {
    registarUsuario(registrarInput: RegistrarInput): Usuario!
    loginUsuario(email: String!, password: String!): Usuario!
    crearOferta(crearOfertaInput: CrearOfertaInput): Oferta!
    borrarOferta(ofertaId: ID!): String!
    interesadoEnOferta(ofertaId: ID!): Oferta!
  }
`;
