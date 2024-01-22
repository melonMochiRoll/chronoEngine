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
      <span>{hour}</span>
      <span>:</span>
      <span>{minute}</span>
      <span>:</span>
      <span>{second}</span>
    </Block>
  );
};

export default Clock;

const Block = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 150px;
  font-weight: 800;
  gap: 10px;
  text-shadow: 0 0 6px #fff;
`;