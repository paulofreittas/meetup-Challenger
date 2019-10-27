import React, { useState, useMemo, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Alert, TouchableOpacity } from 'react-native';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';

import api from '~/services/api';

import Meetup from '~/components/Meetup';
import Header from '~/components/Header';
import Background from '~/components/Background';

import {
  Container,
  List,
  SelectDateContainer,
  SelectedDate,
  Loading,
} from './styles';

function Dashboard({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  async function loadMeetups(pageNumber = 1) {
    try {
      if (loading) return;

      setLoading(true);

      const response = await api.get('meetups', {
        params: { date, page: pageNumber },
      });

      setMeetups(response.data, ...meetups);
      setPage(pageNumber);
    } catch (err) {
      Alert.alert('Erro!', 'Erro ao carregar os Meetups!');
    } finally {
      setLoading(false);
    }
  }

  async function refreshList() {
    setRefreshing(true);

    await loadMeetups();

    setRefreshing(false);
  }

  useEffect(() => {
    if (isFocused) {
      loadMeetups();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  function handleLoadMore() {
    if (meetups.length < 10) return;

    const pageNumber = page + 1;

    loadMeetups(pageNumber);
  }

  async function handleSubscription(id) {
    try {
      await api.post(`meetups/${id}/subscriptions`);

      Alert.alert('Sucesso', 'Inscrição realizada com sucesso');
    } catch (err) {
      Alert.alert('Erro!', 'Erro ao realizar Inscrição!');
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        <SelectDateContainer>
          <TouchableOpacity onPress={handlePrevDay}>
            <Icon name="keyboard-arrow-left" size={30} color="#fff" />
          </TouchableOpacity>
          <SelectedDate>{dateFormatted}</SelectedDate>
          <TouchableOpacity onPress={handleNextDay}>
            <Icon name="keyboard-arrow-right" size={30} color="#fff" />
          </TouchableOpacity>
        </SelectDateContainer>
        <List
          data={meetups}
          keyExtractor={item => String(item.id)}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.01}
          showsVerticalScrollIndicator={false}
          onRefresh={refreshList}
          refreshing={refreshing}
          ListFooterComponent={loading && <Loading />}
          renderItem={({ item }) => (
            <Meetup
              action={() => handleSubscription(item.id)}
              data={item}
              textButton="Realizar inscrição"
            />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};

Dashboard.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Dashboard);
