import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import {
  Container,
  Banner,
  Title,
  DateContent,
  Date,
  LocationContent,
  Location,
  OrganizerContent,
  Organizer,
  SubscriptionButton,
} from './styles';

export default function Meetup({ data, action, textButton }) {
  const dateFormatted = useMemo(
    () =>
      format(parseISO(data.date), "dd 'de' MMMM', às' HH'h'", { locale: pt }),
    [data.date]
  );

  return (
    <Container>
      <Banner source={{ uri: data.banner && data.banner.url }} />
      <Title>{data.title}</Title>
      <DateContent>
        <Icon name="event" size={14} color="rgba(0, 0, 0, 0.4)" />
        <Date>{dateFormatted}</Date>
      </DateContent>
      <LocationContent>
        <Icon name="room" size={14} color="rgba(0, 0, 0, 0.4)" />
        <Location>{data.location}</Location>
      </LocationContent>
      <OrganizerContent>
        <Icon name="person" size={14} color="rgba(0, 0, 0, 0.4)" />
        <Organizer>{data.User.name}</Organizer>
      </OrganizerContent>
      {!data.past && (
        <SubscriptionButton onPress={action}>{textButton}</SubscriptionButton>
      )}
    </Container>
  );
}

Meetup.propTypes = {
  data: PropTypes.shape().isRequired,
  action: PropTypes.func.isRequired,
  textButton: PropTypes.string.isRequired,
};
