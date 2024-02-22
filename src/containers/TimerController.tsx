import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'Hooks/reduxHooks';
import { getProgress, setTime } from 'Features/timerSlice';
import { openModal } from 'Features/modalSlice';
import { ModalCode } from 'Components/common/RenderModal';
import TimerContainer from 'Containers/TimerContainer';
import { displayHMS, toHMS } from 'Utils/time';

const TimerController: FC = () => {
  const dispatch = useAppDispatch();
  const timer = useAppSelector(state => state.timer);
  const [ timeoutID, setTimeoutID ] = useState<NodeJS.Timeout | null>(null);
  const [ running, setRunning ] = useState(false);
  const pageTitleElement = document.getElementsByTagName('title')[0];
  const progress = getProgress(timer);

  useEffect(() => {
    if (running) {
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
    let currentTime = timer.currentTime;
    let experted = performance.now() + timer.originTime - timer.currentTime + 1000;

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

        pageTitleElement.innerHTML = `Timer - ${h}${m}:${s}`;

        const id = setTimeout(timerCallback, 1000 - delay);
        setTimeoutID(id);
        return;
      }

      /** end */
      if (currentTime <= 0) {
        dispatch(openModal({
          code: ModalCode.AlertModal,
        }));
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
    <TimerContainer
      currentTime={timer.currentTime}
      running={running}
      progress={progress}
      onSubmit={onSubmit} />
  );
};

export default TimerController;