import React, { FC } from 'react';
import styled from '@emotion/styled';

interface RegionProps {
  city: string,
  fromUTC: string,
};

const Region: FC<RegionProps> = ({
  city,
  fromUTC,
}) => {
  return (
    <Block>
      <City>{city === 'Asia/Seoul' ? '서울' : city}</City>
      <UTC>UTC{fromUTC}</UTC>
    </Block>
  );
};

export default Region;

const Block = styled.div`
  display: flex;
  color: #fff;
  font-size: 40px;
  text-shadow: 0 0 3px #fff;
  gap: 40px;
`;

const City = styled.span`
  font-weight: 800;
`;
const UTC = styled.span`
  font-weight: 200;
`;