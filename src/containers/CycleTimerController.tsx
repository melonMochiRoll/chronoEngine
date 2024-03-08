import React, { FC, useEffect, useRef, useState } from 'react';
import CycleTimerContainer from 'Containers/CycleTimerContainer';
import { useAppDispatch, useAppSelector } from 'Hooks/reduxHooks';
import { getNextTime, getProgress, setTime } from 'Features/cycleTimerSlice';
import { openModal } from 'Features/modalSlice';
import { ModalCode } from 'Components/common/RenderModal';
import { CYCLE_SAVE_DATA, RECORD_TIME_FORMAT, saveRecord } from 'Features/recordSlice';
import dayjs from 'dayjs';
import { displayHMS, toHMS } from 'Utils/time';
import { TimerCode } from 'Utils/timer-worker';
import { setItem } from 'Utils/localStorage';

const CycleTimerContoller: FC = () => {
  const dispatch = useAppDispatch();
  const cycleTimer = useAppSelector(state => state.cycleTimer);
  const [ running, setRunning ] = useState(false);
  const pageTitleElement = document.getElementsByTagName('title')[0];
  const progress = getProgress(cycleTimer);
  const worker = useRef<Worker>();

  useEffect(() => {
    const workerHandler = ({ data: currentTime }: { data: number }) => {
    
      dispatch(setTime({
        current: currentTime,
      }));
  
      const { hour, minute, second } = toHMS(currentTime);
      const h = hour ? `${displayHMS(hour)}:` : '';
      const m = displayHMS(minute);
      const s = displayHMS(second);
  
      pageTitleElement.innerHTML = `${cycleTimer.currentTime.mode} - ${h}${m}:${s}`;
    };
    
    worker.current = window.Worker && new Worker(new URL('Utils/timer-worker.ts', import.meta.url));
    worker.current?.addEventListener('message', workerHandler);

    return () => {
      worker.current?.terminate();
      worker.current?.removeEventListener('message', workerHandler);
    };
  }, []);

  useEffect(() => {
    const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = true;
    };

    if (cycleTimer.currentTime.current) {
      window.addEventListener('beforeunload', beforeUnloadHandler);
    }

    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
    };
  }, [running]);

  useEffect(() => {
    if (running && cycleTimer.currentTime.current <= 0) {
      dispatch(openModal({
        code: ModalCode.AlertModal,
      }));
      dispatch(saveRecord({
        cycle: cycleTimer.cycleCount,
        mode: `${cycleTimer.currentTime.mode}`,
        elapsedTime: toHMS(cycleTimer.currentTime.origin),
        completionTime: dayjs().format(RECORD_TIME_FORMAT),
      }));
      dispatch(getNextTime());
      setRunning(false);
    }
  }, [cycleTimer]);

  useEffect(() => {
    setItem(CYCLE_SAVE_DATA, cycleTimer);
  }, [cycleTimer]);

  const onSubmit = () => {
    if (!running) {
      worker.current?.postMessage({
        code: TimerCode.Start,
        currentTime: cycleTimer.currentTime.current,
        experted: cycleTimer.currentTime.origin - cycleTimer.currentTime.current + 1000,
      });
    } else {
      worker.current?.postMessage({
        code: TimerCode.Pause,
      });
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