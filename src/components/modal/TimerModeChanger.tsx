import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from 'Hooks/reduxHooks';
import { closeModal } from 'Features/modalSlice';
import { ModeName, setMode } from 'Features/modeSlice';

const TimerModeChanger: FC = () => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector(state => state.mode);

  const setClock = (name: string) => {
    dispatch(setMode({
      mode: name,
    }));
  };
  
  const onClose = () => {
    dispatch(closeModal());
  };

  return (
    <Block>
      <ButtonBox>
        <ModeButton
          name={ModeName.Timer}
          isSelectedMode={mode === ModeName.Timer}
          onClick={(e: any) => setClock(e.target.name)}>
          일반 모드
        </ModeButton>
        <ModeButton
          name={ModeName.CycleTimer}
          isSelectedMode={mode === ModeName.CycleTimer}
          onClick={(e: any) => setClock(e.target.name)}>
          사이클 모드
        </ModeButton>
      </ButtonBox>
      <Button
        onClick={() => onClose()}>
        닫기
      </Button>
    </Block>
  );
};

export default TimerModeChanger;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 80px;
  border: 1px solid #fff;
  box-shadow: 0 0 3px 0 #fff;
  gap: 50px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

const ModeButton = styled.button<{ isSelectedMode: boolean }>`
  color: #fff;
  font-size: 42px;
  font-weight: 600;
  text-shadow: 0 0 3px #fff;
  border: 2px solid ${({ isSelectedMode }) => isSelectedMode ?
    '#c7ea46' : 'rgba(0, 0, 0, 0)'};
  padding: 18px;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border: 2px solid #ed2939;
  }
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