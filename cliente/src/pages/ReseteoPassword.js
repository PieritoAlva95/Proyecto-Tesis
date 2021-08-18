import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';

function ReseteoPassword(props) {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');

  const [resetearPassword, { loading }] = useMutation(RESETEAR_PASSWORD, {
    update(_) {
      props.history.push('/login');
    },
    onError(error) {
      setErrors(error.graphQLErrors[0].extensions.exception.errors);
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    await resetearPassword({
      variables: {
        email,
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
        <h1>Reseteo de Contraseña</h1>
        <Form.Input
          label='Email'
          placeholder='Email...'
          type='email'
          value={email}
          error={errors.email || errors.general ? true : false}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button type='submit' primary>
          Enviar
        </Button>
      </Form>
    </div>
  );
}

const RESETEAR_PASSWORD = gql`
  mutation resetearPassword($email: String!) {
    resetearPassword(email: $email)
  }
`;

export default ReseteoPassword;
