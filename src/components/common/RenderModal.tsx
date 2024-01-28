import React, { FC } from 'react';
import styled from '@emotion/styled';
import AlertModal from 'Components/modal/AlertModal';
import TimerModal from 'Components/modal/TimerModal';
import { useAppSelector } from 'Hooks/reduxHooks';

export const ModalName = {
  AlertModal: 'AlertModal',
  TimerModal: 'TimerModal',
};

interface ModalsType {
  [key: string]: React.ReactNode;
};

const Modals: ModalsType = {
  [ModalName.AlertModal]: <AlertModal />,
  [ModalName.TimerModal]: <TimerModal />,
};

const RenderModal: FC = () => {
  const { name } = useAppSelector(state => state.modal);
  if (!name) return;

  const render = () => {
    if (Modals.hasOwnProperty(name)) {
      return Modals[name];
    }
  };

  return (
    <Block>
      {render()}
    </Block>
  );
};

export default RenderModal;

const Block = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;