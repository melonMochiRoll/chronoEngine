import React, { FC, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'Hooks/reduxHooks';
import { getProgress, setTime } from 'Features/timerSlice';
import { openModal } from 'Features/modalSlice';
import { ModalCode } from 'Components/common/RenderModal';
import TimerContainer from 'Containers/TimerContainer';
import { displayHMS, toHMS } from 'Utils/time';
import { IWorkerToTimerData, TimerCode } from 'Utils/timer-worker';

const TimerController: FC = () => {
  const dispatch = useAppDispatch();
  const timer = useAppSelector(state => state.timer);
  const [ running, setRunning ] = useState(false);
  const pageTitleElement = document.getElementsByTagName('title')[0];
  const progress = getProgress(timer);
  const worker = useRef<Worker>();

  useEffect(() => {
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

    if (timer.currentTime) {
      window.addEventListener('beforeunload', beforeUnloadHandler);
    }

    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler);
    };
  }, [running]);

  useEffect(() => {
    if (running && timer.currentTime <= 0) {
      dispatch(openModal({
        code: ModalCode.AlertModal,
      }));
      setRunning(false);
    }
  }, [timer]);

  const workerHandler = ({ data }: { data: IWorkerToTimerData }) => {

    dispatch(setTime({
      current: data.time,
    }));

    const { hour, minute, second } = toHMS(data.time);
    const h = hour ? `${displayHMS(hour)}:` : '';
    const m = displayHMS(minute);
    const s = displayHMS(second);

    pageTitleElement.innerHTML = `Timer - ${h}${m}:${s}`;
  };

  const onSubmit = async () => {
    if (!running) {
      worker.current?.postMessage({
        code: TimerCode.Start,
        currentTime: timer.currentTime,
        experted: timer.originTime - timer.currentTime + 1000,
      });
    } else {
      worker.current?.postMessage({
        code: TimerCode.Pause,
      });
    }

    setRunning(prev => !prev);
  };

  return (
    <TimerContainer
      currentTime={timer.currentTime}
      running={running}
      progress={progress}
      onSubmit={onSubmit} />
  );
};

export default TimerController;