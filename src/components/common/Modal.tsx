import React, { FC, ReactNode } from 'react';
import styled from '@emotion/styled';

interface ModalProps {
  status: boolean;
  setStatus: () => void;
  children: ReactNode;
};

const Modal: FC<ModalProps> = ({
  status,
  setStatus,
  children,
}) => {
  return (
    <>
    {
      status &&
      <Block
        onClick={() => setStatus()}>
        {children}
      </Block>
    }
    </>
    
  );
};

export default Modal;

const Block = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;