import React, { FC } from 'react';
import styled from '@emotion/styled';
import useTimer from 'Hooks/useTimer';
import { useAppDispatch, useAppSelector } from 'Hooks/reduxHooks';
import { closeModal } from 'Features/modalSlice';
import { toHMS } from 'Utils/time';
import InputClock from 'Components/InputClock';
import { initCycle } from 'Features/cycleTimerSlice';
import useInput from 'Hooks/useInput';

const CycleTimerModal: FC = () => {
  const dispatch = useAppDispatch();
  const cycleTimer = useAppSelector(state => state.cycleTimer);
  const [ workTime, onChangeWorkTime ] = useTimer(cycleTimer.workTime ?
    toHMS(cycleTimer.workTime) : {
    hour: '',
    minute: '',
    second: '',
  });
  const [ restTime, onChangeRestTime ] = useTimer(cycleTimer.restTime ?
    toHMS(cycleTimer.restTime) : {
    hour: '',
    minute: '',
    second: '',
  });
  const [ nthRestTime, onChangeNthRestTime ] = useTimer(cycleTimer.nthRestTime ?
    toHMS(cycleTimer.nthRestTime) : {
    hour: '',
    minute: '',
    second: '',
  });
  const [ nthRest, onChangeNthRest ] = useInput(0);
  
  const onSubmit = () => {
    dispatch(initCycle({
      workTime: Number(workTime.hour) * 3600 + Number(workTime.minute) * 60 + Number(workTime.second),
      restTime: Number(restTime.hour) * 3600 + Number(restTime.minute) * 60 + Number(restTime.second),
      nthRestTime: Number(nthRestTime.hour) * 3600 + Number(nthRestTime.minute) * 60 + Number(nthRestTime.second),
      nthRest: nthRest,
    }));
    dispatch(closeModal());
  };

  const onClose = () => {
    dispatch(closeModal());
  };

  return (
    <Block>
      <InputClock
        title='작업시간 설정'
        value={workTime}
        onChange={onChangeWorkTime} />
      <InputClock
        title='쉬는시간 설정'
        value={restTime}
        onChange={onChangeRestTime} />
      <InputBox>
        <Input
          type='text'
          value={nthRest}
          onChange={onChangeNthRest} />
        <Label>{` : n번째 사이클 설정`}</Label>
      </InputBox>
      <InputClock
        title='n번째 쉬는시간 설정'
        value={nthRestTime}
        onChange={onChangeNthRestTime} />
      <ButtonBox>
        <Button
          onClick={() => onSubmit()}>
          확인
        </Button>
        <Button
          onClick={() => onClose()}>
          취소
        </Button>
      </ButtonBox>
    </Block>
  );
};

export default CycleTimerModal;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const Label = styled.label`
  color: #fff;
  font-size: 32px;
  text-shadow: 0 0 3px #fff;
`;

const Input = styled.input`
  width: 50px;
  font-size: 32px;
  text-align: center;
  border: none;
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