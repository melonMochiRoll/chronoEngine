import React, { FC, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import Modal from 'Components/common/Modal';

interface TimerModalProps {
  status: boolean;
  setOriginTime: any;
  setTime: any;
  setStatus: () => void;
};

const TimerModal: FC<TimerModalProps> = ({
  status,
  setOriginTime,
  setTime,
  setStatus,
}) => {
  const [ hour, setHour ] = useState('');
  const [ minute, setMinute ] = useState('');
  const [ second, setSecond ] = useState('');

  const onChangeHour = useCallback((e: any) => {
    if (e.target.value.length > 2) return;

    setHour(e.target.value);
  }, [hour]);

  const onChangeMinute = useCallback((e: any) => {
    if (e.target.value.length > 2) return;

    setMinute(e.target.value);
  }, [minute]);

  const onChangeSecond = useCallback((e: any) => {
    if (e.target.value.length > 2) return;

    setSecond(e.target.value);
  }, [second]);

  const closeModal = () => {
    const time = Number(hour) * 3600 + Number(minute) * 60 + Number(second);
    setOriginTime(time);
    setTime(time);
    setHour('');
    setMinute('');
    setSecond('');
    setStatus();
  };

  return (
    <Modal
      status={status}
      setStatus={closeModal}>
      <Block
        onClick={(e: any) => e.stopPropagation()}>
        <Input
          type='number'
          value={hour}
          onChange={onChangeHour}
          min={0}
          max={99}
          placeholder='00' />
        <span>:</span>
        <Input
          type='number'
          value={minute}
          onChange={onChangeMinute}
          min={0}
          max={59}
          placeholder='00' />
        <span>:</span>
        <Input
          type='number'
          value={second}
          onChange={onChangeSecond}
          min={0}
          max={59}
          placeholder='00' />
      </Block>
    </Modal>
  );
};

export default TimerModal;

const Block = styled.div`
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