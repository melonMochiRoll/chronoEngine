import React, { FC } from 'react';
import styled from '@emotion/styled';
import CurrentTimeContainer from 'Containers/CurrentTimeContainer';
import TimerContainer from 'Containers/TimerContainer';
import RenderModal from 'Components/common/RenderModal';

const MainPage: FC = () => {
  return (
    <Block>
      <RenderModal />
      <CurrentTimeContainer />
      <TimerContainer />
    </Block>
  );
};

export default MainPage;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;