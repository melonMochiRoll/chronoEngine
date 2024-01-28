import React, { FC } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { SxProps } from '@mui/material';

interface ProgressCircleProps {
  progress: number
};

const ProgressCircle: FC<ProgressCircleProps> = ({
  progress,
}) => {
  return (
    <>
      <CircularProgress
        variant='determinate'
        value={100}
        size={'900px'}
        sx={Background} />
      <CircularProgress
        variant='determinate'
        value={progress}
        size={'900px'}
        sx={Progress} />
    </>
  );
};

export default ProgressCircle;

const Background: SxProps = {
  position: 'absolute',
  color: '#1f2324',

  'circle': {
    strokeWidth: '1.25',
  }
};

const Progress: SxProps = {
  position: 'absolute',
  color: '#20caff',

  'circle': {
    strokeWidth: '1.25',
    transition: 'all 1s',
  }
};