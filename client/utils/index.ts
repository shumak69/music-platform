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
