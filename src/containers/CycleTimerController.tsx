import React, { FC, useState } from 'react';
import CycleTimerContainer from 'Containers/CycleTimerContainer';
import { useAppDispatch, useAppSelector } from 'Hooks/reduxHooks';
import { getNextTime, getProgress, setTime } from 'Features/cycleTimerSlice';
import { openModal } from 'Features/modalSlice';
import { ModalCode } from 'Components/common/RenderModal';
import { saveRecord } from 'Features/recordSlice';
import dayjs from 'dayjs';
import { toHMS } from 'Utils/time';

const CycleTimerContoller: FC = () => {
  const dispatch = useAppDispatch();
  const cycleTimer = useAppSelector(state => state.cycleTimer);
  const [ timeout, setTimeout ] = useState<NodeJS.Timeout | null>(null);
  const [ running, setRunning ] = useState(false);
  const progress = getProgress(cycleTimer);

  const startTimer = () => {
    let currentTime = cycleTimer.currentTime.current;

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
        dispatch(saveRecord({
          cycle: cycleTimer.cycleCount,
          mode: `${cycleTimer.currentTime.mode}`,
          elapsedTime: toHMS(cycleTimer.currentTime.origin),
          completionTime: dayjs().toDate(),
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
        currentTime={cycleTimer.currentTime}
        cycleCount={cycleTimer.cycleCount}
        running={running}
        progress={progress}
        onSubmit={onSubmit} />
    </>
  );
};

export default CycleTimerContoller;