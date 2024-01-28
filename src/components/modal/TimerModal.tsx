import React, { FC } from 'react';
import styled from '@emotion/styled';
import useTimer from 'Hooks/useTimer';
import { useAppDispatch, useAppSelector } from 'Hooks/reduxHooks';
import { initTime } from 'Features/timerSlice';
import { closeModal } from 'Features/modalSlice';
import { toHMS } from 'Utils/time';

const TimerModal: FC = () => {
  const dispatch = useAppDispatch();
  const timer = useAppSelector(state => state.timer);
  const [ value, onChange ] = useTimer(timer.currentTime ?
    toHMS(timer.currentTime) : {
    hour: '',
    minute: '',
    second: '', 
  });
  
  const onSubmit = () => {
    dispatch(initTime({
      time: Number(value.hour) * 3600 + Number(value.minute) * 60 + Number(value.second),
    }));
    dispatch(closeModal());
  };

  return (
    <Block>
      <Top>
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
      </Top>
      <Bottom>
        <Button
          onClick={() => onSubmit()}>
          확인
        </Button>
        <Button
          onClick={() => dispatch(closeModal())}>
          취소
        </Button>
      </Bottom>
    </Block>
  );
};

export default TimerModal;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`;

const Top = styled.div`
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

const Bottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const Input = styled.input`
  width: 100px;
  font-size: 64px;
  text-align: center;
`;

const Button = styled.button`
  color: #fff;
  font-size: 26px;
  font-weight: 600;
  text-shadow: 0 0 3px #fff;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 25px;
  padding: 4px 18px;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border: 1px solid #fff;
  }
`;