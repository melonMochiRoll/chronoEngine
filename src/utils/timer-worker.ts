
export interface IWorkerToTimerData {
  time: number;
  mode: string;
};

export const enum TimerCode {
  Start,
  Pause,
};

interface ITimerData {
  code: TimerCode;
  currentTime: number;
  currentMode: string;
  experted: number;
};

let id: NodeJS.Timeout;

onmessage = ({ data }: { data: ITimerData }) => {
  let currentTime = data.currentTime;
  const currentMode = data.currentMode;
  let experted = performance.now() + data.experted;

  const timerCallback = () => {

   /** running */
    if (currentTime > 0) {
      const delay = performance.now() - experted;
      experted += 1000;
      --currentTime;
      
      id = setTimeout(timerCallback, 1000 - delay);
      postMessage({ time: currentTime, mode: currentMode });
    }
  };
  
  if (data.code === TimerCode.Start) {
    id = setTimeout(timerCallback, 1000);
  }

  if (data.code === TimerCode.Pause) {
    if (id) clearTimeout(id);
  }
};