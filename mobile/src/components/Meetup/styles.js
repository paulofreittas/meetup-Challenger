import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  background: #fff;
  margin-bottom: 30px;
  border-radius: 5px;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: #333;
  margin: 10px 0px 0px 15px;
`;

export const Banner = styled.Image`
  height: 150px;
`;

export const DateContent = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  margin: 10px 0px 0px 15px;
`;

export const Date = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);
  margin-left: 5px;
`;

export const LocationContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0px 0px 15px;
`;

export const Location = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);
  margin-left: 5px;
`;

export const OrganizerContent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0px 0px 10px;
`;

export const Organizer = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.4);
  margin-left: 5px;
  margin-bottom: 5px;
`;

export const SubscriptionButton = styled(Button)`
  align-self: stretch;
  background: #f94d6a;
  margin: 15px 15px;
`;
