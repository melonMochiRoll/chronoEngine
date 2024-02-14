import React, { FC } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { SxProps } from '@mui/material';
import { OriginTimeMode } from 'Features/cycleTimerSlice';

interface CycleProgressCircleProps {
  progress: number;
  mode: string;
};

const CycleProgressCircle: FC<CycleProgressCircleProps> = ({
  progress,
  mode,
}) => {

  const renderCircle = () => {
    if (mode === OriginTimeMode.Work) {
      return <CircularProgress
        variant='determinate'
        value={progress}
        size={'900px'}
        sx={WorkTime} />
    }

    return <CircularProgress
      variant='determinate'
      value={progress}
      size={'900px'}
      sx={RestTime} />
  };

  return (
    <>
      <CircularProgress
        variant='determinate'
        value={100}
        size={'900px'}
        sx={Background} />
      {renderCircle()}
    </>
  );
};

export default CycleProgressCircle;

const Background: SxProps = {
  position: 'absolute',
  color: '#1f2324',

  'circle': {
    strokeWidth: '1.25',
  }
};

const RestTime: SxProps = {
  position: 'absolute',
  color: '#20caff',

  'circle': {
    strokeWidth: '1.25',
    transition: 'all 1s',
  }
};

const WorkTime: SxProps = {
  position: 'absolute',
  color: '#ff5f1f',

  'circle': {
    strokeWidth: '1.25',
    transition: 'all 1s',
  }
};