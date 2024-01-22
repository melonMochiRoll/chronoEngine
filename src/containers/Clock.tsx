import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import TimeFormat from 'Components/TimeFormat';

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
  const [] = useState();

  return (
    <Block>
      <AMPM>AM</AMPM>
      <TimeFormat
        hour={hour}
        minute={minute}
        second={second} />
      <SwitchButton>24h</SwitchButton>
    </Block>
  );
};

export default Clock;

const Block = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  gap: 40px;
`;

const AMPM = styled.span`
  font-size: 56px;
  font-weight: 600;
  text-shadow: 0 0 4px #fff;
`;

const SwtichBox = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SwitchButton = styled.button`
  color: #fff;
  font-size: 20px;
  font-weight: 400;
  text-shadow: 0 0 4px #fff;
  padding: 2px 15px;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 30px;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border: 1px solid #fff;
  }
`;