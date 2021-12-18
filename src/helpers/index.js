export const setItemInLocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getItemFromLocalStorage = (key) => {
  const value = JSON.parse(window.localStorage.getItem(key));
  return value;
};

export const formatTimer = (leftSeconds) => {
  const seconds = leftSeconds % 60;
  const minutes = Math.floor(leftSeconds / 60);
  const minutesString = minutes > 9 ? minutes : `0${minutes}`;
  const secondsString = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutesString}:${secondsString}`;
};

export const formatTimerHourBase = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const allMinutes = Math.floor(seconds / 60);
  const leftMinutes = allMinutes - hours * 60;

  return `${hours} hours ${leftMinutes} minutes`;
};
