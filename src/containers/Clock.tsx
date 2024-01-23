import React, { FC, useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import TimeFormat from 'Components/TimeFormat';
import { getCookie, setCookie } from 'Utils/cookie';

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
  const [ is24h, setIs24h ] = useState(getCookie('is24h') === 'false' ? false : true);
  const numberHour = Number(hour);
  const ampm = numberHour > 12 ? 'PM' : 'AM';

  const onChange = (value: boolean) => {
    setIs24h(!value);
    setCookie('is24h', !value, 259200);
  };

  if (!is24h) {
    hour = numberHour > 12 ?
      String(numberHour - 12) :
      String(numberHour);
  }

  return (
    <Block>
      <AMPM>
        {!is24h && ampm}
      </AMPM>
      <TimeFormat
        hour={hour}
        minute={minute}
        second={second} />
      <SwitchButton
        onClick={() => onChange(is24h)}>
        {is24h ? '24h' : '12h'}
      </SwitchButton>
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
  width: 100px;
  font-size: 56px;
  font-weight: 600;
  text-shadow: 0 0 4px #fff;
`;

const SwitchButton = styled.button`
  width: 75px;
  color: #fff;
  font-size: 20px;
  font-weight: 400;
  text-shadow: 0 0 4px #fff;
  text-align: center;
  padding: 2px 10px;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 30px;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border: 1px solid #fff;
  }
`;