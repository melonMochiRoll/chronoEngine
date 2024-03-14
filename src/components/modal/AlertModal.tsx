import React, { FC, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { closeModal } from 'Features/modalSlice';
import { useAppDispatch } from 'Hooks/reduxHooks';
import { AlertCode } from 'Utils/alert-worker';
import alert01 from 'Assets/audios/Alert01.m4a';

const AlertModal: FC = () => {
  const dispatch = useAppDispatch();
  const alert = new Audio(alert01);
  const worker = useRef<Worker>();
  
  useEffect(() => {
    const workerHandler = () => {
      alert.play();
    };

    worker.current = window.Worker && new Worker(new URL('Utils/alert-worker.ts', import.meta.url));
    worker.current?.addEventListener('message', workerHandler);
    worker.current?.postMessage({
      code: AlertCode.Start,
    });

    return () => {
      worker.current?.terminate();
      worker.current?.removeEventListener('message', workerHandler);
      worker.current?.postMessage({
        code: AlertCode.Pause,
      });
    };
  }, []);

  return (
    <Block>
      <Button onClick={() => dispatch(closeModal())}>알람 끄기</Button>
    </Block>
  );
};

export default AlertModal;

const Block = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  color: #fff;
  font-size: 28px;
  text-shadow: 0 0 6px #fff;
  border: 1px solid #fff;
  border-radius: 25px;
  padding: 5px 20px;
  background-color: #dc143c;
  cursor: pointer;
  transition: all 0.3s;
`;