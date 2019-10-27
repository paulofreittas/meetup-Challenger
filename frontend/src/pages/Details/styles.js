import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 940px;
  margin: 0 auto;

  img {
    height: 300px;
    width: 940px;
    border-radius: 4px;
  }

  div.dataLocation {
    display: flex;
    flex: 10;
    margin-top: 30px;

    div.data {
      display: flex;
      justify-content: center;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.6);
      margin-right: 30px;

      svg {
        margin-right: 10px;
        color: rgba(255, 255, 255, 0.6);
      }
    }

    div.location {
      display: flex;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.6);

      svg {
        margin-right: 10px;
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }

  div.description {
    color: #fff;
    font-size: 18px;
    line-height: 32px;
    margin-top: 25px;
  }

  div.top-title {
    margin: 50px 0px;
    display: flex;
    align-items: center;
    flex: 20;

    h3 {
      font-size: 32px;
      font-weight: bold;
      color: #fff;
      flex: 12;
    }

    .actionButton {
      display: flex;
      justify-content: flex-end;
      flex: 3;

      button.btnEdit {
        background: #4dbaf9;

        &:hover {
          background: ${darken(0.05, '#4dbaf9')};
        }
      }

      button.btnCancel {
        background: #d44059;

        &:hover {
          background: ${darken(0.05, '#D44059')};
        }
      }
    }

    button {
      display: flex;
      justify-content: space-around;
      padding: 0px 15px;
      align-items: center;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      border: none;
      border-radius: 4px;
      height: 42px;
      width: 132px;
      transition: background 0.2s;
    }
  }
`;
