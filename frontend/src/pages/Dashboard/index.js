/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import { Container } from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(true);
  let body;

  function handleNew() {
    history.push('/meetup');
  }

  function handleDetais(meetupId) {
    history.push(`/details/${meetupId}`);
  }

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('organizing');

      if (response.data) {
        const data = response.data.filter(meetup => {
          if (!meetup.past) {
            meetup.date = format(
              parseISO(meetup.date),
              "d 'de' MMMM', às ' H'h'",
              {
                locale: pt,
              }
            );

            return {
              id: meetup.id,
              title: meetup.title,
              description: meetup.description,
              date: meetup.date,
            };
          }
        });

        setMeetups(data);
        setLoading(false);
      }
    }

    loadMeetups();
  }, []);

  if (!loading && meetups.length > 0) {
    body = meetups.map(meetup => (
      <div
        className="meetup"
        key={meetup.id}
        onClick={() => handleDetais(meetup.id)}
      >
        <div className="title">{meetup.title}</div>
        <div className="date">{meetup.date}</div>
        <div className="icon">
          <MdChevronRight size={24} color="#fff" />
        </div>
      </div>
    ));
  } else if (!loading && meetups.length === 0) {
    body = (
      <div className="no-meetups">
        Você não possuí nenhuma meetup que possa ser editada
      </div>
    );
  }

  return (
    <Container>
      <div className="top-title">
        <h3>Meus meetups</h3>
        <button type="button" onClick={handleNew}>
          <MdAddCircleOutline size={20} color="#fff" />
          Novo meetup
        </button>
      </div>

      {body}
    </Container>
  );
}
