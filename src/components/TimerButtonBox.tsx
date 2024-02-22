import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useAppDispatch } from 'Hooks/reduxHooks';
import { resetTime } from 'Features/timerSlice';
import { openModal } from 'Features/modalSlice';
import { ModalCode } from 'Components/common/RenderModal';

interface TimerButtonBoxProps {
  running: boolean;
  onSubmit: () => void;
};

const TimerButtonBox: FC<TimerButtonBoxProps> = ({
  running,
  onSubmit,
}) => {
  const dispatch = useAppDispatch();

  const reset = () => {
    dispatch(resetTime());
  };

  const openModeChanger = () => {
    dispatch(openModal({
      code: ModalCode.TimerModeChanger,
    }));
  };

  return (
    <Block>
      <Top>
        <Button
          onClick={() => onSubmit()}>
          {running ? '중지' : '시작'}
        </Button>
        {!running &&
          <Button
            onClick={() => reset()}>
            리셋
          </Button>
        }
      </Top>
      {!running &&
        <Button
          onClick={() => openModeChanger()}>
          모드 변경
        </Button>
      }
    </Block>
  );
};

export default TimerButtonBox;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
  gap: 30px;
`;

const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
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

