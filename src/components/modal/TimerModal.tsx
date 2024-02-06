import React, { FC } from 'react';
import styled from '@emotion/styled';
import useTimer from 'Hooks/useTimer';
import { useAppDispatch, useAppSelector } from 'Hooks/reduxHooks';
import { initTime } from 'Features/timerSlice';
import { closeModal } from 'Features/modalSlice';
import { toHMS } from 'Utils/time';
import InputClock from 'Components/InputClock';

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
      <InputClock
        title='타이머 설정'
        value={value}
        onChange={onChange} />
      <ButtonBox>
        <Button
          onClick={() => onSubmit()}>
          확인
        </Button>
        <Button
          onClick={() => dispatch(closeModal())}>
          취소
        </Button>
      </ButtonBox>
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

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
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