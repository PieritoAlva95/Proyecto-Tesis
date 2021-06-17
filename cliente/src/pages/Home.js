import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';

import OfertaCard from '../components/OfertaCard';

const Home = () => {
  const { data, loading } = useQuery(FETCH_OFERTAS_QUERY);

  return (
    <Grid columns={3}>
      <Grid.Row className='page-title'>
        <h1>Ofertas Recientes</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Cargando Ofertas...</h1>
        ) : (
          data.getOfertas &&
          data.getOfertas.map((oferta) => (
            <Grid.Column key={oferta.id} style={{ marginBottom: 20 }}>
              <OfertaCard oferta={oferta} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};

const FETCH_OFERTAS_QUERY = gql`
  {
    getOfertas {
      id
      titulo
      cuerpo
      nombres
      apellidos
      numeroDeInteresados
      creadoEn
    }
  }
`;

export default Home;
