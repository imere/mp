export function formatSeconds(seconds: number): string {
  seconds = seconds >> 0;
  const sec = seconds % 60;
  const min = (seconds - sec) / 60;
  return `${min > 9 ? min : `0${min}`}:${sec > 9 ? sec : `0${sec}`}`;
}
