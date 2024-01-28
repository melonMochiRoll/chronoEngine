import { useCallback, useState } from "react";

export interface HMS {
  hour: number | string,
  minute: number | string,
  second: number | string,
};

type useTimerReturnType = [
  HMS,
  (e: any) => void,
  React.Dispatch<any>,
];

const useTimer = (initData: HMS): useTimerReturnType => {
  const [ value, setValue ] = useState(initData);

  const onChange = useCallback((e: any) => {
    if (e.target.value.length > 2) return;

    if (e.target.name === 'hour') {
      setValue({
        ...value,
        hour: e.target.value,
      });
    }

    if (e.target.name === 'minute') {
      setValue({
        ...value,
        minute: e.target.value,
      });
    }

    if (e.target.name === 'second') {
      setValue({
        ...value,
        second: e.target.value,
      });
    }

  }, [value.hour, value.minute, value.second]);

  return [
    value,
    onChange,
    setValue,
  ];
};

export default useTimer;