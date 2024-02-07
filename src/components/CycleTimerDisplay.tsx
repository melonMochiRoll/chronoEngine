import React, { FC } from 'react';
import styled from '@emotion/styled';
import FireIcon from '@mui/icons-material/Whatshot';
import { SxProps } from '@mui/material';

interface CycleTimerDisplayProps {
  cycleCount: number;
  isWorkTime: boolean;
  onClick: () => void;
};

const CycleTimerDisplay: FC<CycleTimerDisplayProps> = ({
  cycleCount,
  isWorkTime,
  onClick,
}) => {
  return (
    <>
      {
      isWorkTime ?
        <Mode>Work</Mode> :
        <Mode>Rest</Mode>
      }
      <Cycle onClick={onClick}>
        <FireIcon sx={FireIconStyle(isWorkTime)} />
        <CycleCount>{cycleCount}</CycleCount>
      </Cycle>
    </>
  );
};

export default CycleTimerDisplay;

const Cycle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3px 30px;
  cursor: pointer;

  &:hover {
    border: 1px solid #fff;
    box-shadow: 0 0 7px 0 #fff;
  }
`;

const FireIconStyle = (mode: boolean): SxProps => {
  return {
    color: mode ? '#ff5f1f' : '#20caff',
    fontSize: '72px',
  }
};

const CycleCount = styled.span`
  color: #fff;
  font-size: 54px;
  text-shadow: 0 0 3px #fff;
`;

const Mode = styled.span`
  color: #fff;
  font-size: 58px;
  text-shadow: 0 0 3px #fff;
  padding-bottom: 10px;
`;