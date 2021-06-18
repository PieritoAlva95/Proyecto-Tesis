import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';

function Register() {
  const [errors, setErrors] = useState({});
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [documentoDeIdentidad, setDocumentoDeIdentidad] = useState('');
  const [numeroDeCelular, setNumeroDeCelular] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');

  const [registrarUsuario, { loading }] = useMutation(REGISTAR_USUARIO, {
    update(_, result) {
      console.log(result);
      window.location.href = '/';
    },
    onError(error) {
      setErrors(error.graphQLErrors[0].extensions.exception.errors);
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    await registrarUsuario({
      variables: {
        nombres,
        apellidos,
        documentoDeIdentidad,
        numeroDeCelular,
        email,
        password,
        confirmarPassword,
      },
    });
  };

  return (
    <div className='form-container'>
      {Object.keys(errors).length > 0 && (
        <div className='ui error message'>
          <ul className='list'>
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Registro de Usuario</h1>
        <small>* = campo obligatorio</small>
        <Form.Input
          label='Nombres'
          placeholder='* Nombres..'
          type='text'
          value={nombres}
          error={errors.nombres ? true : false}
          onChange={(e) => setNombres(e.target.value)}
        />
        <Form.Input
          label='Apellidos'
          placeholder='* Apellidos..'
          type='text'
          value={apellidos}
          error={errors.apellidos ? true : false}
          onChange={(e) => setApellidos(e.target.value)}
        />
        <Form.Input
          label='Documento De Identidad'
          placeholder='* Documento De Identidad...'
          type='text'
          value={documentoDeIdentidad}
          error={errors.documentoDeIdentidad ? true : false}
          onChange={(e) => setDocumentoDeIdentidad(e.target.value)}
          pattern='[0-9]'
        />
        <Form.Input
          label='Numero De Celular'
          placeholder='* Numero De Celular..'
          name='numeroDeCelular'
          type='text'
          value={numeroDeCelular}
          error={errors.numeroDeCelular ? true : false}
          onChange={(e) => setNumeroDeCelular(e.target.value)}
        />
        <Form.Input
          label='Email'
          placeholder='* Email..'
          type='email'
          value={email}
          error={errors.email ? true : false}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Input
          label='Contraseña'
          placeholder='* Contraseña..'
          type='password'
          value={password}
          error={errors.password ? true : false}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Form.Input
          label='Confirmar Contraseña'
          placeholder='* Confirmar Contraseña..'
          name='confirmarPassword'
          type='password'
          value={confirmarPassword}
          error={errors.confirmarPassword ? true : false}
          onChange={(e) => setConfirmarPassword(e.target.value)}
        />
        <Button type='submit' primary>
          Registrar
        </Button>
      </Form>
    </div>
  );
}

const REGISTAR_USUARIO = gql`
  mutation RegistarUsuario(
    $nombres: String!
    $apellidos: String!
    $documentoDeIdentidad: String!
    $numeroDeCelular: String!
    $email: String!
    $password: String!
    $confirmarPassword: String!
  ) {
    registarUsuario(
      registrarInput: {
        nombres: $nombres
        apellidos: $apellidos
        documentoDeIdentidad: $documentoDeIdentidad
        numeroDeCelular: $numeroDeCelular
        email: $email
        password: $password
        confirmarPassword: $confirmarPassword
      }
    ) {
      id
      nombres
      apellidos
      email
      token
      creadoEn
    }
  }
`;

export default Register;
