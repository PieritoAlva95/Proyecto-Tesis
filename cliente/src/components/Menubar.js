import React, { useContext, useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function MenuBar() {
  const { user, logOut } = useContext(AuthContext);

  const nombreRuta = window.location.pathname;
  const ruta = nombreRuta === '/' ? 'home' : nombreRuta.substr(1);
  const [itemActivo, setItemActivo] = useState(ruta);

  const handleItemClick = (e, { name }) => setItemActivo(name);

  const menuBar = user ? (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item
        name={`${user.nombres.split(' ')[0]} ${user.apellidos.split(' ')[0]}`}
        active
        as={Link}
        to='/'
      />
      <Menu.Menu position='right'>
        <Menu.Item name='Cerrar sesión' onClick={logOut} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item
        name='Trabajos'
        active={itemActivo === 'Trabajos'}
        onClick={handleItemClick}
        as={Link}
        to='/'
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='Ingresa'
          active={itemActivo === 'Ingresa'}
          onClick={handleItemClick}
          as={Link}
          to='/login'
        />
        <Menu.Item
          name='Regístrate'
          active={itemActivo === 'Regístrate'}
          onClick={handleItemClick}
          as={Link}
          to='/register'
        />
      </Menu.Menu>
    </Menu>
  );

  return menuBar;
}

export default MenuBar;
