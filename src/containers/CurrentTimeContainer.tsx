import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Clock from 'Components/Clock';
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
  align-items: center;
  gap: 20px;
`;