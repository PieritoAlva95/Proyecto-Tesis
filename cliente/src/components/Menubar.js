import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function MenuBar() {
  const nombreRuta = window.location.pathname;
  const ruta = nombreRuta === '/' ? 'home' : nombreRuta.substr(1);
  const [itemActivo, setItemActivo] = useState(ruta);

  const handleItemClick = (e, { name }) => setItemActivo(name);

  return (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item
        name='Trabajos 24/7'
        active={itemActivo === 'Trabajos 24/7'}
        onClick={handleItemClick}
        as={Link}
        to='/'
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='Iniciar sesión'
          active={itemActivo === 'Iniciar sesión'}
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
}

export default MenuBar;
