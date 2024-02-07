import React, { FC } from 'react';
import styled from '@emotion/styled';
import { HMS } from 'Hooks/useTimer';

interface InputClockProps {
  title: string;
  value: HMS;
  onChange: (e: any) => void;
};

const InputClock: FC<InputClockProps> = ({
  title,
  value,
  onChange,
}) => {
  return (
    <Block>
      {title && <Title>{title}</Title>}
      <InputBox>
        <Input
          type='number'
          name='hour'
          value={value.hour}
          onChange={onChange}
          min={0}
          max={99}
          placeholder='00' />
        <span>:</span>
        <Input
          type='number'
          name='minute'
          value={value.minute}
          onChange={onChange}
          min={0}
          max={59}
          placeholder='00' />
        <span>:</span>
        <Input
          type='number'
          name='second'
          value={value.second}
          onChange={onChange}
          min={0}
          max={59}
          placeholder='00' />
      </InputBox>
    </Block>
  );
};

export default InputClock;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.span`
  color: #fff;
  font-size: 32px;
  text-shadow: 0 0 3px #fff;
  padding-bottom: 20px;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0);
  gap: 20px;

  span {
    color: #fff;
    font-size: 48px;
    font-weight: 800;
    text-shadow: 0 0 6px #fff;
  }
`;

const Input = styled.input`
  width: 100px;
  font-size: 64px;
  text-align: center;
`;