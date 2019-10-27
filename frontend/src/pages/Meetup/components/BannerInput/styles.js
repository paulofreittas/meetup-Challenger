import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      height: 300px;
      width: 940px;
      border-radius: 4px;
    }

    div {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 300px;
      width: 940px;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.3);

      strong {
        color: rgba(255, 255, 255, 0.3);
        padding-top: 10px;
        font-size: 20px;
        font-weight: bold;
      }
    }

    input {
      display: none;
    }
  }
`;
