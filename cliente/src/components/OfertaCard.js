import React from 'react';
import { Button, Icon, Card, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';

const OfertaCard = ({
  oferta: {
    id,
    titulo,
    cuerpo,
    nombres,
    apellidos,
    numeroDeInteresados,
    creadoEn,
  },
}) => {
  moment.locale('es');

  function likeOferta() {
    console.log('Le diste like!');
  }

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{titulo}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{`${nombres.split(' ')[0]} ${
          apellidos.split(' ')[0]
        } - ${moment(creadoEn).fromNow()}`}</Card.Meta>
        <Card.Description>{cuerpo}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as='div' labelPosition='right' onClick={likeOferta}>
          <Button color='teal' basic>
            <Icon name='heart' />
          </Button>
          <Label basic color='teal' pointing='left'>
            {numeroDeInteresados === 1
              ? `${numeroDeInteresados} interesado`
              : `${numeroDeInteresados} interesados`}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
};

export default OfertaCard;
