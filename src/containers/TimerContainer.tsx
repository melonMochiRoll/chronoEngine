import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import TimeFormat from 'Components/TimeFormat';
import { toHMS } from 'Utils/time';
import ProgressCircle from 'Components/ProgressCircle';
import { ModalCode } from 'Components/common/RenderModal';
import { useAppDispatch } from 'Hooks/reduxHooks';
import { openModal } from 'Features/modalSlice';
import TimerButtonBox from 'Components/TimerButtonBox';

interface TimerContainerProps {
  currentTime: number;
  running: boolean;
  progress: number;
  onSubmit: () => void;
};

const TimerContainer: FC<TimerContainerProps> = ({
  currentTime,
  running,
  progress,
  onSubmit,
}) => {
  const dispatch = useAppDispatch();
  const [ HMS, setHMS ] = useState({ hour: 0, minute: 0, second: 0 });

  useEffect(() => {
    setHMS(toHMS(currentTime));
  }, [currentTime]);

  const onOpen = () => {
    if (!running) {
      dispatch(openModal({
        code: ModalCode.TimerModal,
      }));
    };
  };

  return (
    <Block>
      <ProgressCircle
        progress={progress} />
      <Content>
        <TimeFormat
          onClick={() => onOpen()}
          hour={`${HMS.hour}`}
          minute={`${HMS.minute}`}
          second={`${HMS.second}`} />
        <TimerButtonBox
          running={running}
          onSubmit={onSubmit}/>
      </Content>
    </Block>
  );
};

export default TimerContainer;

const Block = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #121711;
`;

const Content = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;