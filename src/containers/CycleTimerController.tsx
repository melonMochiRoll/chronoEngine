import React, { FC, useEffect, useState } from 'react';
import CycleTimerContainer from 'Containers/CycleTimerContainer';
import { useAppDispatch, useAppSelector } from 'Hooks/reduxHooks';
import { getNextTime, getProgress, setTime } from 'Features/cycleTimerSlice';
import { openModal } from 'Features/modalSlice';
import { ModalCode } from 'Components/common/RenderModal';
import { saveRecord } from 'Features/recordSlice';
import dayjs from 'dayjs';
import { displayHMS, toHMS } from 'Utils/time';

const CycleTimerContoller: FC = () => {
  const dispatch = useAppDispatch();
  const cycleTimer = useAppSelector(state => state.cycleTimer);
  const [ timeoutID, setTimeoutID ] = useState<NodeJS.Timeout | null>(null);
  const [ running, setRunning ] = useState(false);
  const pageTitleElement = document.getElementsByTagName('title')[0];
  const progress = getProgress(cycleTimer);

  useEffect(() => {
    if (cycleTimer.currentTime.current) {
      window.addEventListener('beforeunload', beforeUnloadHandler);
    }

    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
    };
  }, [running]);

  const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = true;
  };

  const startTimer = () => {
    let currentTime = cycleTimer.currentTime.current;
    let experted = performance.now() + cycleTimer.currentTime.origin - cycleTimer.currentTime.current + 1000;

    const timerCallback = () => {

      /** running */
      if (currentTime > 0) {
        const delay = performance.now() - experted;
        experted += 1000;
        --currentTime;

        dispatch(setTime({
          current: currentTime,
        }));

        const { hour, minute, second } = toHMS(currentTime);
        const h = hour ? `${displayHMS(hour)}:` : '';
        const m = displayHMS(minute);
        const s = displayHMS(second);

        pageTitleElement.innerHTML = `${cycleTimer.currentTime.mode} - ${h}${m}:${s}`;

        const id = setTimeout(timerCallback, 1000 - delay);
        setTimeoutID(id);
        return;
      } 
      
      /** end */
      if (currentTime <= 0) {
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
      }
    };

    const id = setTimeout(timerCallback, 1000);
    setTimeoutID(id);
  };

  const onSubmit = () => {
    if (!running) {
      startTimer();
    } else {
      if (timeoutID) clearTimeout(timeoutID);
    }
    
    setRunning(prev => !prev);
  };

  return (
    <CycleTimerContainer
      currentTime={cycleTimer.currentTime}
      cycleCount={cycleTimer.cycleCount}
      running={running}
      progress={progress}
      onSubmit={onSubmit} />
  );
};

export default CycleTimerContoller;