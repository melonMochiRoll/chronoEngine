import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import TimeFormat from 'Components/TimeFormat';
import { toHMS } from 'Utils/time';
import { ModalCode } from 'Components/common/RenderModal';
import { openModal } from 'Features/modalSlice';
import CycleProgressCircle from 'Components/CycleProgressCircle';
import CycleTimerDisplay from 'Components/CycleTimerDisplay';
import CycleTimerButtonBox from 'Components/CycleTimerButtonBox';
import { useAppDispatch } from 'Hooks/reduxHooks';
import { ITimeFormat } from 'Features/cycleTimerSlice';

interface CycleTimerContainerProps {
  currentTime: ITimeFormat;
  cycleCount: number;
  running: boolean;
  progress: number;
  onSubmit: () => void;
};

const CycleTimerContainer: FC<CycleTimerContainerProps> = ({
  currentTime,
  cycleCount,
  running,
  progress,
  onSubmit,
}) => {
  const dispatch = useAppDispatch();
  const [ HMS, setHMS ] = useState({ hour: 0, minute: 0, second: 0 });

  useEffect(() => {
    setHMS(toHMS(currentTime.current));
  }, [currentTime]);

  const timerModalOpen = () => {
    if (!running) {
      dispatch(openModal({
        code: ModalCode.CycleTimerModal,
      }));
    };
  };

  const recordModalOpen = () => {
    dispatch(openModal({
      code: ModalCode.RecordModal,
    }));
  };

  return (
    <Block>
      <CycleProgressCircle
        progress={progress}
        mode={currentTime.mode} />
      <Content>
        <CycleTimerDisplay
          onClick={() => recordModalOpen()}
          mode={currentTime.mode}
          cycleCount={cycleCount} />
        <TimeFormat
          onClick={() => timerModalOpen()}
          hour={`${HMS.hour}`}
          minute={`${HMS.minute}`}
          second={`${HMS.second}`} />
        <CycleTimerButtonBox
          running={running}
          onSubmit={onSubmit} />
      </Content>
    </Block>
  );
};

export default CycleTimerContainer;

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
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;