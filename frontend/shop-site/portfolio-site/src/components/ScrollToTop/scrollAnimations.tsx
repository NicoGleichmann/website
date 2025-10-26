// src/utils/scrollAnimations.ts

const smoothEase = [0.6, 0.05, -0.01, 0.9] 

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1.2, ease: smoothEase },
  viewport: { once: true, amount: 0.5 },
};

export const fadeInDown = {
  initial: { opacity: 0, y: -30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 1.2, ease: smoothEase },
  viewport: { once: true, amount: 0.5 },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -80 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 2.0, ease: smoothEase },
  viewport: { once: true, amount: 0.5 },
};

export const fadeInRight = {
  initial: { opacity: 0, x: 80 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 2.0, ease: smoothEase },
  viewport: { once: true, amount: 0.5 },
};


export const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };
  
  export const fadeItemUp = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: smoothEase },
    },
  };
  
  export const imageFadeRight = {
    hidden: { opacity: 0, x: 80 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.4, ease: smoothEase },
    },
  };