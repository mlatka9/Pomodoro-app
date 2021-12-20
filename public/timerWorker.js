let timer = 99;
let timerId;

onmessage = function (e) {
  const { action, value } = e.data;
//   console.log('data in worker', action, value);
  if (action === 'setup') {
    timer = value;
    postMessage(value);
  } else if (action === 'start_incrementing') {
    timerId = setInterval(() => {
      timer++;
      postMessage(timer);
    }, 1000);
    postMessage(timer);
  } else if (action === 'start_decrementing') {
    timerId = setInterval(() => {
      timer--;
      postMessage(timer);
    }, 1000);
  } else if (action === 'cancel_timer') {
    clearInterval(timerId);
    postMessage(timer);
  }
};
