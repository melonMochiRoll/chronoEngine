import React, { FC } from 'react';
import styled from '@emotion/styled';

interface DateProps {
  year: string,
  month: string,
  date: string,
  day: string,
};

const Date: FC<DateProps> = ({
  year,
  month,
  date,
  day,
}) => {

  const dayOfWeek = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];

  return (
    <Block>
      <span>{year}년</span>
      <span>{month}월</span>
      <span>{date}일</span>
      <span>{dayOfWeek[Number(day)]}</span>
    </Block>
  );
};

export default Date;

const Block = styled.div`
  display: flex;
  color: #fff;
  font-size: 32px;
  font-weight: 600;
  gap: 15px;
  text-shadow: 0 0 3px #fff;
  padding-top: 20px;
`;