import React, { FC } from 'react';
import styled from '@emotion/styled';
import AlertModal from 'Components/modal/AlertModal';
import TimerModal from 'Components/modal/TimerModal';
import { useAppSelector } from 'Hooks/reduxHooks';
import CycleTimerModal from 'Components/modal/CycleTimerModal';
import TimerModeChanger from 'Components/modal/TimerModeChanger';
import RecordModal from 'Components/modal/RecordModal';

export const enum ModalCode {
  AlertModal,
  TimerModal,
  CycleTimerModal,
  TimerModeChanger,
  RecordModal,
};

interface ModalsType {
  [key: number]: React.ReactNode;
};

const Modals: ModalsType = {
  [ModalCode.AlertModal]: <AlertModal />,
  [ModalCode.TimerModal]: <TimerModal />,
  [ModalCode.CycleTimerModal]: <CycleTimerModal />,
  [ModalCode.TimerModeChanger]: <TimerModeChanger />,
  [ModalCode.RecordModal]: <RecordModal />
};

const RenderModal: FC = () => {
  const { code } = useAppSelector(state => state.modal);
  if (code < 0) return;

  const render = () => {
    if (Modals.hasOwnProperty(code)) {
      return Modals[code];
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
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 2;
`;