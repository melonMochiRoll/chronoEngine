import React, { FC } from 'react';
import styled from '@emotion/styled';
import FireIcon from '@mui/icons-material/Whatshot';
import { SxProps } from '@mui/material';
import { OriginTimeMode } from 'Features/cycleTimerSlice';

interface CycleTimerDisplayProps {
  cycleCount: number;
  mode: string;
  onClick: () => void;
};

const CycleTimerDisplay: FC<CycleTimerDisplayProps> = ({
  cycleCount,
  mode,
  onClick,
}) => {
  return (
    <>
      <Mode>{mode}</Mode>
      <Cycle onClick={onClick}>
        <FireIcon sx={FireIconStyle(mode)} />
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

const FireIconStyle = (mode: string): SxProps => {
  return {
    color: mode === OriginTimeMode.Work ? '#ff5f1f' : '#20caff',
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