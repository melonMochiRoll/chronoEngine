import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import UpArrowIcon from '@mui/icons-material/NorthRounded';
import TimerIcon from '@mui/icons-material/AccessAlarmRounded';
import { throttle } from 'lodash';

const Navigator: FC = ({}) => {
  const [ heightY, setHeightY ] = useState(0);

  const handleScroll = throttle(() => {
    setHeightY(window.scrollY);
  }, 500);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToY = (y: number) => {
    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  };

  return (
    <Block>
      {heightY > 200 &&
        <Cell
          onClick={() => scrollToY(0)}>
          <UpArrowIcon />
          <span>Top</span>
        </Cell>}
      <Cell
        onClick={() => scrollToY(1000)}>
        <TimerIcon />
        <span>Timer</span>
      </Cell>
    </Block>
  );
};

export default Navigator;

const Block = styled.div`
  position: fixed;
  top: 3%;
  left: 10%;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1;
`;

const Cell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 5px;
  cursor: pointer;

  span {
    font-size: 16px;
  }
`;