import React from 'react';
import { MdAddCircleOutline } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { updateProfileRequest } from '~/store/modules/user/actions';

import { Container } from './styles';

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

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      <Form initialData={profile} schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu endereço de email" />

        <hr />

        <Input
          type="password"
          name="oldPassword"
          placeholder="Sua senha atual"
        />
        <Input type="password" name="password" placeholder="Sua nova senha" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirme a nova senha"
        />
        <button type="submit">
          <MdAddCircleOutline size={20} color="#fff" />
          Atualizar perfil
        </button>
      </Form>
    </Container>
  );
}
