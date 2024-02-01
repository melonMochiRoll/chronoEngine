import React, { FC } from 'react';
import CycleTimerController from 'Containers/CycleTimerController';
import TimerController from 'Containers/TimerController';
import { useAppSelector } from 'Hooks/reduxHooks';
import { ModeName } from 'Features/modeSlice';

const RenderTimer: FC = () => {
  const { mode } = useAppSelector(state => state.mode);
  
  const renderTimer = () => {
    
    if (mode === ModeName.Timer) {
      return <TimerController />;
    }

    if (mode === ModeName.CycleTimer) {
      return <CycleTimerController />;
    }
  };

  return (
    <>
      {renderTimer()}
    </>
  );
};

export default RenderTimer;