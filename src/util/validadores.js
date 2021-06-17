module.exports.validarRegistrarInput = (
  nombres,
  apellidos,
  documentoDeIdentidad,
  numeroDeCelular,
  email,
  password,
  confirmarPassword
) => {
  const errors = {};
  if (nombres.trim() === '') {
    errors.nombres = 'Los nombres del usuario no deben estar vacíos.';
  }

  if (apellidos.trim() === '') {
    errors.apellidos = 'Los apellidos del usuario no deben estar vacíos.';
  }

  if (documentoDeIdentidad.trim() === '') {
    errors.documentoDeIdentidad =
      'El documento de identidad del usuario no debe estar vacío.';
  }

  if (numeroDeCelular.trim() === '') {
    errors.numeroDeCelular =
      'El numero de celular del usuario no debe estar vacío.';
  } else if (numeroDeCelular.length !== 10) {
    errors.numeroDeCelular = 'Por favor, ingrese un numero de celular valido.';
  } else {
    const regEx = /^([0-9])*$/;
    if (!numeroDeCelular.match(regEx)) {
      errors.numeroDeCelular = 'Por favor, ingrese un numero de celular.';
    }
  }

  if (email.trim() === '') {
    errors.email = 'El email del usuario no debe estar vacío.';
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Por favor, ingrese un correo electronico valido.';
    }
  }

  if (password === '') {
    errors.password = 'La contraseña del usuario no debe estar vacía.';
  } else if (password !== confirmarPassword) {
    errors.confirmarPassword = 'Las contraseñas deben coincidir.';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validarLoginInput = (email, password) => {
  const errors = {};
  if (email.trim() === '') {
    errors.email = 'El correo electrónico no debe estar vacío.';
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = 'Por favor, ingrese un correo electronico valido.';
    }
  }

  if (password.trim() === '') {
    errors.password = 'La contraseña no debe estar vacía.';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
