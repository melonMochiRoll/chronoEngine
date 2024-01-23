import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Clock from 'Containers/Clock';
import Region from 'Components/Region';
import Date from 'Components/Date';

dayjs.extend(utc);
dayjs.extend(timezone);
const format = 'YYYY-MM-DD-d-HH-mm-ss-Z';

const CurrentTimeContainer: FC = () => {
  const [ now, setNow ] = useState(dayjs().format(format));
  const [
    year,
    month,
    date,
    day,
    hour,
    minute,
    second,
    fromUTC,
  ] = now.split('-');
  const city = dayjs.tz.guess();

  setInterval(() => {
    setNow(dayjs().format(format));
  }, 1000);

  return (
    <Block>
      <Region
        city={city} 
        fromUTC={fromUTC} />
      <Clock
        hour={hour}
        minute={minute}
        second={second} />
      <Date
        year={year}
        month={month}
        date={date}
        day={day} />
    </Block>
  );
};

export default CurrentTimeContainer;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  background-image:
    url('https://images.unsplash.com/photo-1439792675105-701e6a4ab6f0?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 1473w');
  background-size: cover;
  background-position-y: center;
  gap: 30px;
`;