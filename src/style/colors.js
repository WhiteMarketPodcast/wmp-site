export function hexToRGBA(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return `rgb(${r}, ${g}, ${b})`;
}

// When changing these colours, make sure to update the ones in colors.sass;
export const white = `#F7F7F7`;
export const primaryLight = `#5f9683`;
export const primary = `#257C6B`;
export const primaryDark = `#1F6658`;
export const offWhite = `#F2F2F2`;
export const lightGrey = `#E9E9E9`;
export const grey = `#D2D4C8`;
export const darkGrey = `#4A4A4A`;
export const black = `#2A2A2A`;

export const seeThruWhite = hexToRGBA(white, 0.8);
export const seeThruBlack = hexToRGBA(black, 0.7);
export const seeThruPrimary = hexToRGBA(primary, 0.7);
export const seeThruPrimaryDark = hexToRGBA(primaryDark, 0.8);
