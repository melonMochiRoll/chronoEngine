import React, { FC, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from 'Hooks/reduxHooks';
import { closeModal } from 'Features/modalSlice';
import { IRecord, RECORD_TIME_FORMAT, clearState } from 'Features/recordSlice';
import dayjs from 'dayjs';
import { clearStorage } from 'Utils/localStorage';
import { clearCycleCount } from 'Features/cycleTimerSlice';

interface IProcessedRecord {
  cycle: number;
  mode: string;
  recordTime: string;
};

const getDayjsFormat = (records: IRecord[]) => 
  records.map((item: IRecord) => {
    return {
      cycle: item.cycle,
      mode: item.mode,
      recordTime: dayjs(item.recordTime).format(RECORD_TIME_FORMAT),
    };
  });

const RecordModal: FC = () => {
  const dispatch = useAppDispatch();
  const { records } = useAppSelector(state => state.record);
  const [ mappedRecord, setMappedRecord ] = useState(getDayjsFormat(records));

  useEffect(() => {
    setMappedRecord(getDayjsFormat(records));
  }, [records]);

  const clearRecord = () => {
    dispatch(clearState());
    clearStorage();
  };

  const clearCycle = () => {
    dispatch(clearCycleCount());
  };

  const onClose = () => {
    dispatch(closeModal());
  };
  
  return (
    <Block>
      <RecordsBox>
        <Head>
          <span>Cycle</span>
          <span>Mode</span>
          <span>Completion time</span>
        </Head>
        <Scroll>
          {mappedRecord.map((item: IProcessedRecord, idx: number) => 
            (
              <Row key={idx}>
                <span>{item.cycle}</span>
                <span>{item.mode}</span>
                <span>{item.recordTime}</span>
              </Row>
            )
          )}
        </Scroll>
      </RecordsBox>
      <ButtonBox>
        <Button
          onClick={clearRecord}>
          기록 초기화
        </Button>
        <Button
          onClick={clearCycle}>
          사이클 횟수 초기화
        </Button>
        <Button
          onClick={onClose}>
          닫기
        </Button>
      </ButtonBox>
    </Block>
  );
};

export default RecordModal;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #fff;
  padding: 30px;
`;

const RecordsBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  color: #fff;
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  border-bottom: 1px solid #fff;
  padding-bottom: 10px;

  span {
    min-width: 150px;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
  text-align: center;

  span {
    min-width: 150px;
  }
`;

const Scroll = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  height: 400px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
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