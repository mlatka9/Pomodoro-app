export const setItemInLocalStorage = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getItemFromLocalStorage = (key) => {
  const value = JSON.parse(window.localStorage.getItem(key));
  console.log(value);
  return value;
};
