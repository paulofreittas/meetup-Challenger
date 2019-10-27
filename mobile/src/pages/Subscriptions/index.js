import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';

import api from '~/services/api';

import Header from '~/components/Header';
import Background from '~/components/Background';
import Meetup from '~/components/Meetup';

import { Container, List, Loading } from './styles';

function Subscriptions({ isFocused }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleCancel(id) {
    await api
      .delete(`/subscriptions/${id}`)
      .then(() => {
        Alert.alert('Sucesso', 'Inscrição Cancelada com Sucesso!');
        setSubscriptions(subscriptions.filter(s => s.id !== id));
      })
      .catch(() => {
        Alert.alert(
          'Erro',
          'Houve um problema ao cancelar inscrição, tente mais tarde'
        );
      });
  }

  async function loadSubscriptions() {
    if (loading) return;

    setLoading(true);

    await api
      .get('subscriptions')
      .then(res => {
        if (res.data.length > 0) {
          const data = res.data.map(c => ({
            id: c.id,
            title: c.Meetup.title,
            date: c.Meetup.date,
            location: c.Meetup.location,
            past: c.Meetup.past,
            banner: {
              url: c.Meetup.banner.url,
            },
            User: {
              name: c.Meetup.User.name,
            },
          }));

          setSubscriptions(data);
        }
      })
      .catch(() => {
        Alert.alert(
          'Erro!',
          'Erro ao carregar as Inscrições, tente mais tarde'
        );
      });

    setLoading(false);
  }

  async function refreshList() {
    setRefreshing(true);

    await loadSubscriptions();

    setRefreshing(false);
  }

  useEffect(() => {
    if (isFocused) {
      loadSubscriptions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <Background>
      <Container>
        <Header />
        <List
          data={subscriptions}
          keyExtractor={item => String(item.id)}
          showsVerticalScrollIndicator={false}
          onRefresh={refreshList}
          refreshing={refreshing}
          ListFooterComponent={loading && <Loading />}
          renderItem={({ item }) => (
            <Meetup
              action={() => handleCancel(item.id)}
              data={item}
              textButton="Cancelar inscrição"
            />
          )}
        />
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};

Subscriptions.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Subscriptions);
