import React, { FC } from 'react';
import styled from '@emotion/styled';

interface TimeFormatProps {
  hour: string,
  minute: string,
  second: string,
  onClick?: () => void,
};

const TimeFormat: FC<TimeFormatProps> = ({
  hour,
  minute,
  second,
  onClick,
}) => {
  return (
    <Block onClick={() => onClick && onClick()}>
      <Box>
        <Display>{hour?.length === 1 ? `0${hour}` : hour}</Display>
        <HMS>HOURS</HMS>
      </Box>
      <Display>:</Display>
      <Box>
        <Display>{minute?.length === 1 ? `0${minute}` : minute}</Display>
        <HMS>MINUTES</HMS>
      </Box>
      <Display>:</Display>
      <Box>
        <Display>{second?.length === 1 ? `0${second}` : second}</Display>
        <HMS>SECONDS</HMS>
      </Box>
    </Block>
  );
};

export default TimeFormat;

const Block = styled.div`
  display: flex;
  color: #fff;
  gap: 10px;
`;

const Box = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const Display = styled.span`
  font-size: 150px;
  font-weight: 800;
  text-shadow: 0 0 6px #fff;
`;

const HMS = styled.span`
  font-size: 20px;
  font-weight: 200;
  text-shadow: 0 0 3px #fff;
`;