import { useCallback, useState } from "react";

const useTimer: any = (initData: any) => {
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