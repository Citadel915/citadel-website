export const EASE_SMOOTH: [number, number, number, number] = [0.25, 0, 0.15, 1];
export const EASE_OUT: [number, number, number, number] = [0.0, 0, 0.2, 1];

export const DURATION = {
  fast:   0.3,
  medium: 0.6,
  slow:   0.8,
  crawl:  1.2,
} as const;

export const STAGGER = {
  tight:  0.08,
  normal: 0.15,
  wide:   0.25,
} as const;

export const REVEAL = {
  fadeUp: {
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden:  { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideInLeft: {
    hidden:  { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
} as const;
