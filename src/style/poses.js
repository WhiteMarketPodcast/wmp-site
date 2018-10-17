const duration = 300;
const delay = 150;

export const pageFade = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: { duration },
    delay,
    beforeChildren: true,
  },
  exit: {
    // opacity: 0,
    scale: 2,
    transition: { duration },
  },
};

export const staggerChildren = {
  enter: { staggerChildren: 50 },
};

export const delayChildren = {
  enter: { delayChildren: delay },
};

export const slideUp = {
  initial: { y: '110%' },
  enter: { y: 0, transition: { duration } },
};

export const appear = {
  initial: { opacity: 0, y: 10 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration },
  },
};

export const fade = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { duration },
  },
};
