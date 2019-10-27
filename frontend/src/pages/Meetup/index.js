import React, { useState, useEffect } from 'react';
import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { Input, Form } from '@rocketseat/unform';
import BannerInput from './components/BannerInput';

import DatePicker from './components/DatePicker';

import api from '~/services/api';
import history from '~/services/history';

import { Container } from './styles';

const schema = Yup.object().shape({
  file_id: Yup.number().required(() => {
    toast.error('O banner é obrigatório');
  }),
  title: Yup.string().required('O título é obrigatório'),
  description: Yup.string()
    .min(10, 'A descrição deve possuir no mínimo 10 caracteres')
    .max(255, 'A descrição não pode ultrapassar 255 caracteres')
    .required('A descrição é obrigatória'),
  date: Yup.date().required('A data é obrigatória'),
  location: Yup.string()
    .min(10, 'A localização deve possuir no mínimo 10 caracteres')
    .required('A localização é obrigatória'),
});

export default function Meetup({ match }) {
  const [meetup, setMeetup] = useState({});

  const { meetupId } = match.params;

  useEffect(() => {
    if (meetupId) {
      // eslint-disable-next-line no-inner-declarations
      async function loadMeetup() {
        const response = await api.get('organizing', {
          params: {
            id: meetupId,
          },
        });

        if (response.data) {
          setMeetup(response.data);
        }
      }

      loadMeetup();
    }
  }, [meetupId]);

  async function handleSubmit(data) {
    if (meetupId) {
      data = { ...data, id: meetupId };

      await api
        .put('meetups', data)
        .then(() => {
          toast.success('Meetup cadastrada com sucesso');
          history.push('/dashboard');
        })
        .catch(() => {
          toast.error('Não foi possível salvar o meetup, verifique seus dados');
        });
    } else {
      await api
        .post('meetups', data)
        .then(() => {
          toast.success('Meetup cadastrada com sucesso');
          history.push('/dashboard');
        })
        .catch(() => {
          toast.error('Não foi possível salvar o meetup, verifique seus dados');
        });
    }
  }

  return (
    <Container>
      <Form schema={schema} initialData={meetup} onSubmit={handleSubmit}>
        <BannerInput
          name="file_id"
          urlImage={meetup.banner && meetup.banner.url}
        />

        <Input name="title" placeholder="Título do meetup" />
        <Input
          multiline
          name="description"
          placeholder="Descrição completa"
          rows="6"
        />
        <DatePicker name="date" placeholder="Data do meetup" />
        <Input name="location" placeholder="Localização" />

        <button type="submit" className="btnSubmit">
          <MdAddCircleOutline size={20} color="#fff" />
          Salvar meetup
        </button>
      </Form>
    </Container>
  );
}

Meetup.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      meetupId: PropTypes.string,
    }),
  }).isRequired,
};
