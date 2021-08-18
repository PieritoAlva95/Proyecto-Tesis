import gql from 'graphql-tag';
import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';

import { AuthContext } from '../context/auth';
import { Link } from 'react-router-dom';

function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginUsuario, { loading }] = useMutation(LOGIN_USUARIO, {
    update(_, { data: { loginUsuario: userData } }) {
      context.login(userData);
      props.history.push('/');
    },
    onError(error) {
      setErrors(error.graphQLErrors[0].extensions.exception.errors);
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    await loginUsuario({
      variables: {
        email,
        password,
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
        <h1>Inicio de sesión</h1>
        <Form.Input
          label='Email'
          placeholder='Email...'
          type='email'
          value={email}
          error={errors.email || errors.general ? true : false}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Input
          label='Contraseña'
          placeholder='Contraseña...'
          type='password'
          value={password}
          error={errors.email || errors.general ? true : false}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type='submit' primary>
          Ingresar
        </Button>
        <Button as={Link} to={'/reseteo'}>
          Has olvidado tu Contraseña?
        </Button>
      </Form>
    </div>
  );
}

const LOGIN_USUARIO = gql`
  mutation LoginUsuario($email: String!, $password: String!) {
    loginUsuario(email: $email, password: $password) {
      id
      nombres
      apellidos
      email
      token
      creadoEn
    }
  }
`;

export default Login;
