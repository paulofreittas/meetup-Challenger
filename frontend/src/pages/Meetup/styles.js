import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 940px;
  margin: 50px auto;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    span {
      color: #fff;
      margin: 0 0 10px;
      font-weight: bold;
    }

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    textarea {
      line-height: 25px;
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;

      flex-direction: column;
      resize: none;

      & {
        padding-top: 10px;
      }

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    button.btnSubmit {
      margin-top: 20px;
      padding: 0px 10px;
      height: 42px;
      width: 162px;
      display: flex;
      justify-content: space-around;
      align-self: flex-end;
      background: #f94d6a;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.05, '#f94d6a')};
      }
    }

    input {
      width: 100%;
    }
  }
`;
