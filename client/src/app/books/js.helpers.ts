export const debounce = (callback: Function, delay = 1000) => {
  let time: any;
  return (...args: any) => {
    clearTimeout(time);
    time = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
