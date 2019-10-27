import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.3);
`;

export const Content = styled.div`
  height: 92px;
  max-width: 940px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin: 30px 0;
      width: 31px;
      height: 32px;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;

  div {
    text-align: right;
    margin-right: 30px;

    strong {
      display: block;
      color: #fff;
      font-size: 14px;
    }

    a {
      display: block;
      margin-top: 5px;
      font-size: 14px;
      color: #999;
    }
  }

  button {
    width: 71px;
    height: 42px;
    border-radius: 4px;
    border: none;
    background: #d44059;
    color: #fff;
    font-size: 16px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.1, '#d44059')};
    }
  }
`;
