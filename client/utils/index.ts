export function transformToDate(num: number): string {
  return `${getZero(Math.floor(num / 60))}:${getZero(num % 60)}`;
}

export function getZero(num: number) {
  if (num >= 10) {
    return num;
  } else {
    return `0${num}`;
  }
}

export function parseFromLS<T>(key: string) {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return [];
  // throw Error("Error occured in localStorage");
}
