import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import TimeFormat from 'Components/TimeFormat';
import { toHMS } from 'Utils/time';
import ProgressCircle from 'Components/ProgressCircle';
import { ModalName } from 'Components/common/RenderModal';
import { useAppDispatch, useAppSelector } from 'Hooks/reduxHooks';
import { openModal } from 'Features/modalSlice';
import { setTime } from 'Features/timerSlice';

const TimerContainer: FC = () => {
  const dispatch = useAppDispatch();
  const timer = useAppSelector(state => state.timer);
  const [ HMS, setHMS ] = useState({ hour: 0, minute: 0, second: 0 });
  const [ timeout, setTimeout ] = useState<NodeJS.Timeout | null>(null);
  const [ running, setRunning ] = useState(false);

  useEffect(() => {
    setHMS(toHMS(timer.currentTime));
  }, [timer.currentTime]);

  const startTimer = () => {
    let currentTime = timer.currentTime;

    const timeout = setInterval(() => {
      if (currentTime > 0) {
        dispatch(setTime({
          time: --currentTime,
        }));
      } 
      
      if (currentTime < 1) {
        dispatch(openModal({
          name: ModalName.AlertModal,
        }));
        setRunning(false);
        clearInterval(timeout);
      }
    }, 1000);

    setTimeout(timeout);
  };

  const onSubmit = () => {
    if (!running) {
      startTimer();
    } else {
      if (timeout) clearInterval(timeout);
    }
    
    setRunning(prev => !prev);
  };

  const onOpen = () => {
    if (!running) {
      dispatch(openModal({
        name: ModalName.TimerModal,
      }));
    };
  };

  return (
    <Block>
      <ProgressCircle
        progress={100 - Math.floor(timer.currentTime/timer.originTime * 100)} />
      <Content>
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