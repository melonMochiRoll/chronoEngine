import React, { FC, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from 'Hooks/reduxHooks';
import { closeModal } from 'Features/modalSlice';
import { IRecord, RECORD_TIME_FORMAT, clearState, loadRecords } from 'Features/recordSlice';
import dayjs from 'dayjs';
import { clearStorage, getRecords } from 'Utils/localStorage';
import { clearCycleCount } from 'Features/cycleTimerSlice';

interface IProcessedRecord {
  cycle: number;
  mode: string;
  elapsedTime: string;
  completionTime: string;
};

const isRecord = (value: IRecord[] | any) => {
  return (value[0] as IRecord).elapsedTime !== undefined;
};

const getDisplayFormat = (records: IRecord[]) => {
  if (isRecord(records)) {
    return records.map((item: IRecord) => {
      const hour = item.elapsedTime.hour ? `${item.elapsedTime.hour}시` : '';
      const minute = item.elapsedTime.minute ? `${item.elapsedTime.minute}분` : '';
      const second = item.elapsedTime.second ? `${item.elapsedTime.second}초` : '';
  
      return {
        cycle: item.cycle,
        mode: item.mode,
        elapsedTime: `${hour} ${minute} ${second}`,
        completionTime: dayjs(item.completionTime).format(RECORD_TIME_FORMAT),
      };
    })
  }

  return [];
};

const RecordModal: FC = () => {
  const dispatch = useAppDispatch();
  const { records, lastCursor } = useAppSelector(state => state.record);
  const [ mappedRecord, setMappedRecord ] = useState(getDisplayFormat(records));
  const [ canLoadMore, setCanLoadMore ] = useState(records.length > 9);
  const currentLastcursor = useRef(lastCursor);

  useEffect(() => {
    setMappedRecord(getDisplayFormat(records));
  }, [records]);
  
  const loadMore = (cursor: number) => {
    const { records: newRecords, lastCursor } = getRecords(cursor - 1);
    const result = [ ...records, ...newRecords ];

    if (newRecords.length < 10) {
      setCanLoadMore(false);
    }

    currentLastcursor.current = lastCursor;
    setMappedRecord(getDisplayFormat(result));
  };

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
          <span>Elapsed Time</span>
          <span>Completion time</span>
        </Head>
        <Scroll>
          {mappedRecord.map((item: IProcessedRecord, idx: number) => 
            {
              return item ? 
                <Row key={idx}>
                  <span>{item.cycle}</span>
                  <span>{item.mode}</span>
                  <span>{item.elapsedTime}</span>
                  <span>{item.completionTime}</span>
                </Row> : '';
            }
          )}
          {canLoadMore &&
          <LoadMore>
            <button onClick={() => loadMore(currentLastcursor.current)}>Load More</button>
          </LoadMore>}
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
  width: 800px;
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

  span:nth-of-type(1) {
    min-width: 130px;
  }

  span:nth-of-type(2) {
    min-width: 130px;
  }

  span:nth-of-type(3) {
    min-width: 200px;
  }

  span:nth-of-type(4) {
    min-width: 200px;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
  text-align: center;

  span:nth-of-type(1) {
    min-width: 130px;
  }

  span:nth-of-type(2) {
    min-width: 130px;
  }

  span:nth-of-type(3) {
    min-width: 210px;
  }

  span:nth-of-type(4) {
    min-width: 200px;
  }
`;

const Scroll = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  height: 400px;
  overflow: auto;
`;

const LoadMore = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;

  button {
    color: #fff;
    font-size: 22px;
    font-weight: 600;
    padding: 7px 25px;
    background-color: rgba(0, 0, 0, 0);
    border: 1px solid #fff;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
      color: #000;
      background-color: #fff;
    }
  }
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