
export const enum AlertCode {
  Start,
  Pause,
};

interface IAlertData {
  code: AlertCode,
};

let id: NodeJS.Timeout;

onmessage = ({ data }: { data: IAlertData }) => {
  
  if (data.code === AlertCode.Start) {
    id = setInterval(() => postMessage('on'), 1000);
  }

  if (data.code === AlertCode.Pause) {
    if (id) clearInterval(id);
  }
};