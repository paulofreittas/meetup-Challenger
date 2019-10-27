import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import Background from '~/components/Background';
import Header from '~/components/Header';

import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

import {
  Container,
  Separator,
  Form,
  FormInput,
  SubmitButton,
  LogoutButton,
} from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Insira seu nome'),
  email: Yup.string()
    .email('Insira um email válido')
    .required('O email é obrigatório'),
  oldPassword: Yup.string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .required('A senha é obrigatória'),
  password: Yup.string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .when('oldPassword', (oldPassword, field) =>
      oldPassword ? field.required('A senha é obrigatória') : field
    ),
  confirmPassword: Yup.string()
    .required('A confirmação de senha é obrigatória')
    .test(
      'passwords-match',
      'As senhas digitadas não são iguais',
      function validate(value) {
        return this.parent.password === value;
      }
    ),
});

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
  }, [profile]);

  function handleLogout() {
    dispatch(signOut());
  }

  function handleSubmit() {
    schema
      .validate(
        {
          name,
          email,
          oldPassword,
          password,
          confirmPassword,
        },
        { abortEarly: false }
      )
      .then(function success(value) {
        dispatch(updateProfileRequest(value));
      })
      .catch(function error(err) {
        Alert.alert('Dados Inválidos', err.errors[0]);
      });

    navigation.navigate('Dashboard');
  }

  return (
    <Background>
      <Header />
      <Container>
        <Form>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome completo"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}
          />

          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => oldPasswordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />

          <Separator />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha atual"
            ref={oldPasswordRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={oldPassword}
            onChangeText={setOldPassword}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua nova senha"
            ref={passwordRef}
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            returnKeyType="next"
            value={password}
            onChangeText={setPassword}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Confirmação de senha"
            ref={confirmPasswordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <SubmitButton onPress={handleSubmit}>Salvar perfil</SubmitButton>
          <LogoutButton onPress={handleLogout}>Sair do Meetup</LogoutButton>
        </Form>
      </Container>
    </Background>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};

Profile.propTypes = {
  navigation: PropTypes.element.isRequired,
};
