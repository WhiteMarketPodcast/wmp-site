export const tinyWMPLogo = `https://www.whitemarketpodcast.eu/icons/icon-48x48.png`;

const pad = (string) => `0${string}`.slice(-2);

export function formatTime(seconds) {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = pad(date.getUTCSeconds());
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`;
  }
  return `${mm}:${ss}`;
}
