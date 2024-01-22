import React, { FC } from 'react';
import styled from '@emotion/styled';
import CurrentTimeContainer from 'Containers/CurrentTimeContainer';

const MainPage: FC = () => {
  return (
    <Block>
      <CurrentTimeContainer />
    </Block>
  );
};

export default MainPage;

const Block = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image:
    url('https://images.unsplash.com/photo-1439792675105-701e6a4ab6f0?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 1473w');
  background-size: cover;
  background-position-y: center;
`;