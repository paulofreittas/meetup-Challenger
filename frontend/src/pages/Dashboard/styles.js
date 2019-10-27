import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 940px;
  margin: 0 auto;

  div.top-title {
    margin: 50px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      font-size: 32px;
      font-weight: bold;
      color: #fff;
    }

    button {
      display: flex;
      justify-content: space-around;
      padding: 0px 15px;
      align-items: center;
      background: #f94d6a;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      border: none;
      border-radius: 4px;
      height: 42px;
      width: 172px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.05, '#f94d6a')};
      }
    }
  }

  div.meetup {
    display: flex;
    flex: 20;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.1);
    height: 62px;
    display: flex;
    margin-bottom: 10px;

    div.title {
      margin: 20px 0px 21px 30px;
      font-size: 18px;
      color: #fff;
      font-weight: bold;
      flex: 9;
    }

    div.date {
      margin: 20px 0px 21px 0px;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.6);
      flex: 9;
      text-align: right;
    }

    div.icon {
      flex: 2;
      margin-top: 20px;
      text-align: center;
    }
  }

  div.no-meetups {
    margin-top: 50px;
    color: #fff;
    font-size: 18px;
    text-align: center;
  }
`;
