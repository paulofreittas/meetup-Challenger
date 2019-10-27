import React, { useRef, useState } from 'react';
import { Image, Alert } from 'react-native';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/logo.png';
import { signInRequest } from '~/store/modules/auth/actions';

import Background from '~/components/Background';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email válido')
    .required('O email é obrigatório'),
  password: Yup.string()
    .required('A senha é obrigatória')
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();
  const passwordRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    schema
      .validate({ email, password }, { abortEarly: false })
      .then(function success() {
        dispatch(signInRequest(email, password));
      })
      .catch(function error(err) {
        Alert.alert('Dados inválidos', err.errors[0]);
      });
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Digite sua senha"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Entrar
          </SubmitButton>
        </Form>

        <SignLink
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        >
          <SignLinkText>Criar conta gratuita</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.shape().isRequired,
};
