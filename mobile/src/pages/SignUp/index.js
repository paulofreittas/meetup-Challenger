import React, { useRef, useState } from 'react';
import { Image, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import logo from '~/assets/logo.png';

import Backgrond from '~/components/Background';
import { signUpRequest } from '~/store/modules/auth/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

export default function SignUp({ navigation }) {
  const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector(state => state.auth.loading);

  const schema = Yup.object().shape({
    name: Yup.string().required('Insira seu nome'),
    email: Yup.string()
      .email('Insira um email válido')
      .required('O email é obrigatório'),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha deve ter no mínimo 6 caracteres'),
  });

  function handleSubmit() {
    schema
      .validate({ name, email, password }, { abortEarly: false })
      .then(function success() {
        dispatch(signUpRequest(name, email, password));

        navigation.navigate('SignIn');
      })
      .catch(function error(err) {
        Alert.alert('Dados inválidos', err.errors[0]);
      });
  }

  return (
    <Backgrond>
      <Container>
        <Image source={logo} />

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
            Criar conta
          </SubmitButton>
        </Form>

        <SignLink
          onPress={() => {
            navigation.navigate('SignIn');
          }}
        >
          <SignLinkText>Já possuo uma conta</SignLinkText>
        </SignLink>
      </Container>
    </Backgrond>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape().isRequired,
};
