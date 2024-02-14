import React, { FC } from 'react';
import styled from '@emotion/styled';
import CurrentTimeContainer from 'Containers/CurrentTimeContainer';
import RenderModal from 'Components/common/RenderModal';
import RenderTimer from 'Components/common/RenderTimer';
import Navigator from 'Components/Navigator';
import Footer from 'Containers/Footer';

const MainPage: FC = () => {
  return (
    <Block>
      <RenderModal />
      <Navigator />
      <CurrentTimeContainer />
      <RenderTimer />
      <Footer />
    </Block>
  );
};

export default MainPage;

const Block = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;