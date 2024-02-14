import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'Hooks/reduxHooks';
import { getProgress, setTime } from 'Features/timerSlice';
import { openModal } from 'Features/modalSlice';
import { ModalCode } from 'Components/common/RenderModal';
import TimerContainer from 'Containers/TimerContainer';

const TimerController: FC = () => {
  const dispatch = useAppDispatch();
  const timer = useAppSelector(state => state.timer);
  const [ timeout, setTimeout ] = useState<NodeJS.Timeout | null>(null);
  const [ running, setRunning ] = useState(false);
  const progress = getProgress(timer);

  const startTimer = () => {
    let currentTime = timer.currentTime;

    const timeout = setInterval(() => {
      if (currentTime > 0) {
        dispatch(setTime({
          current: --currentTime,
        }));
      } 
      
      if (currentTime < 1) {
        dispatch(openModal({
          code: ModalCode.AlertModal,
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

  return (
    <>
      <TimerContainer
        currentTime={timer.currentTime}
        running={running}
        progress={progress}
        onSubmit={onSubmit} />
    </>
  );
};

export default TimerController;