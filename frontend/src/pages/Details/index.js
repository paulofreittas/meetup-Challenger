import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { MdEdit, MdDeleteForever, MdEvent, MdRoom } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import { Container } from './styles';

export default function Details({ match }) {
  const { meetupId } = match.params;

  const [meetup, setMeetup] = useState({});

  useEffect(() => {
    async function loadMeetup() {
      const response = await api.get('organizing', {
        params: {
          id: meetupId,
        },
      });

      if (response.data) {
        response.data.date = format(
          parseISO(response.data.date),
          "d 'de' MMMM', às ' H'h'",
          {
            locale: pt,
          }
        );
        setMeetup(response.data);
      }
    }

    loadMeetup();
  }, [meetupId]);

  function handleEdit(id) {
    history.push(`/meetup/${id}`);
  }

  async function handleCancel(id) {
    const response = await api.delete(`meetups/${id}`);

    if (response.status === 200) {
      toast.success('Meetup excluído com sucesso');
      history.push('/dashboard');
    } else {
      toast.error('Houve um problema ao excluír o meetup, contate o suporte');
    }
  }

  return (
    <Container>
      <div className="top-title">
        <h3>{meetup.title}</h3>
        <div className="actionButton">
          <button
            type="button"
            className="btnEdit"
            onClick={() => handleEdit(meetup.id)}
          >
            <MdEdit size={20} color="#fff" />
            Editar
          </button>
        </div>
        <div className="actionButton">
          <button
            type="button"
            className="btnCancel"
            onClick={() => handleCancel(meetup.id)}
          >
            <MdDeleteForever size={20} color="#fff" />
            Cancelar
          </button>
        </div>
      </div>
      <img src={meetup.banner && meetup.banner.url} alt="Banner" />
      <div className="description">{meetup.description}</div>
      <div className="dataLocation">
        <div className="data">
          <MdEvent size={20} />
          {meetup.date}
        </div>
        <div className="location">
          <MdRoom size={20} />
          {meetup.location}
        </div>
      </div>
    </Container>
  );
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      meetupId: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
