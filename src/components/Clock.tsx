import React, { FC } from 'react';
import styled from '@emotion/styled';

interface ClockProps {
  hour: string,
  minute: string,
  second: string,
};

const Clock: FC<ClockProps> = ({
  hour,
  minute,
  second,
}) => {
  return (
    <Block>
      <Box>
        <Display>{hour}</Display>
        <HMS>HOURS</HMS>
      </Box>
      <Display>:</Display>
      <Box>
        <Display>{minute}</Display>
        <HMS>MINUTES</HMS>
      </Box>
      <Display>:</Display>
      <Box>
        <Display>{second}</Display>
        <HMS>SECONDS</HMS>
      </Box>
    </Block>
  );
};

export default Clock;

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
  text-align: center;
`;