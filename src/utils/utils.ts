/**
 * get current time
 */
export function showTime(): string {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();

  return `${hour} : ${minute} : ${second}`;
}
