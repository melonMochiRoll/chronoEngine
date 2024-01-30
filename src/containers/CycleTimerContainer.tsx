import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import TimeFormat from 'Components/TimeFormat';
import { toHMS } from 'Utils/time';
import { ModalName } from 'Components/common/RenderModal';
import { useAppDispatch, useAppSelector } from 'Hooks/reduxHooks';
import { openModal } from 'Features/modalSlice';
import CycleProgressCircle from 'Components/CycleProgressCircle';

interface CycleTimerContainerProps {
  cycleTimer: any;
  running: boolean;
  onSubmit: () => void;
};

const CycleTimerContainer: FC<CycleTimerContainerProps> = ({
  cycleTimer,
  running,
  onSubmit,
}) => {
  const dispatch = useAppDispatch();
  const [ HMS, setHMS ] = useState({ hour: 0, minute: 0, second: 0 });
  const { originTime, workTime, restTime, currentTime } = cycleTimer;

  useEffect(() => {
    setHMS(toHMS(currentTime));
  }, [currentTime]);

  const onOpen = () => {
    if (!running) {
      dispatch(openModal({
        name: ModalName.CycleTimerModal,
      }));
    };
  };

  return (
    <Block>
      <CycleProgressCircle
        originTime={originTime}
        workTime={workTime}
        restTime={restTime}
        currentTime={currentTime} />
      <Content>
        {
          originTime.length ?
            <Mode>Work</Mode> :
            <Mode>Rest</Mode>
        }
        <TimeFormat
          onClick={() => onOpen()}
          hour={`${HMS.hour}`}
          minute={`${HMS.minute}`}
          second={`${HMS.second}`} />
        <ControlBox>
          <Button
            onClick={() => onSubmit()}>
            {running ? '중지' : '시작'}
          </Button>
        </ControlBox>
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

const Mode = styled.span`
  color: #fff;
  font-size: 64px;
  text-shadow: 0 0 3px #fff;
  padding-bottom: 90px;
`;

const ControlBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
`;

const Button = styled.button`
  color: #fff;
  font-size: 26px;
  font-weight: 600;
  text-shadow: 0 0 3px #fff;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 25px;
  padding: 4px 18px;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border: 1px solid #fff;
  }
`;