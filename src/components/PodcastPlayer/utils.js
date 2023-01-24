export const tinyWMPLogo = `https://www.whitemarketpodcast.cc/icons/icon-48x48.png`

const pad = (string) => `0${string}`.slice(-2)

export function formatTime(seconds, prefix = ``) {
  if (!seconds) return ``

  const date = new Date(seconds * 1000)
  const hh = date.getUTCHours()
  const mm = date.getUTCMinutes()
  const ss = pad(date.getUTCSeconds())

  if (hh) {
    return `${prefix}${hh}:${pad(mm)}:${ss}`
  }
  return `${prefix}${mm}:${ss}`
}
