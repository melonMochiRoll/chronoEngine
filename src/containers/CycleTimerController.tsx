import React, { FC, useState } from 'react';
import CycleTimerContainer from 'Containers/CycleTimerContainer';
import { useAppDispatch, useAppSelector } from 'Hooks/reduxHooks';
import { getNextTime, setTime } from 'Features/cycleTimerSlice';
import { openModal } from 'Features/modalSlice';
import { ModalName } from 'Components/common/RenderModal';

const CycleTimerContoller: FC = () => {
  const dispatch = useAppDispatch();
  const cycleTimer = useAppSelector(state => state.cycleTimer);
  const [ timeout, setTimeout ] = useState<NodeJS.Timeout | null>(null);
  const [ running, setRunning ] = useState(false);

  const startTimer = () => {
    let currentTime = cycleTimer.currentTime;

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
        dispatch(getNextTime());
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
      <CycleTimerContainer
        cycleTimer={cycleTimer}
        running={running}
        onSubmit={onSubmit} />
    </>
  );
};

export default CycleTimerContoller;