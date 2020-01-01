const duration = 300
export const delay = duration + 50
const stagger = duration / 2

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
    opacity: 0,
    transition: { duration },
  },
}

export const staggerChildren = {
  enter: { staggerChildren: stagger },
}

export const delayChildren = {
  enter: { delayChildren: delay },
}

export const slideUp = {
  initial: { opacity: 0, y: 10 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration },
  },
}

export const slideUpWithDelay = {
  ...slideUp,
  enter: { ...slideUp.enter, delay },
}

export const fade = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { duration },
  },
}

export const fadeWithDelay = { ...fade, enter: { ...fade.enter, delay } }
