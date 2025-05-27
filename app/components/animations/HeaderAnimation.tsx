// animations/HeaderAnimation.js
export const navbarAnimation = {
    initial: {
      y: -100,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.8
      }
    }
  };
  export const logoAnimation = {
    initial: {
      x: -100,
      opacity: 0,
      scale: 0.8
    },
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: 0.2,
        duration: 0.8
      }
    }
  };
  export const logoTextAnimation = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.4,
        duration: 0.6
      }
    }
  };
  export const menuItemsAnimation = {
    initial: {
      opacity: 0,
      y: -20
    },
    animate: (custom: any) => ({
      // animate: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
       
        delay: 0.5 + custom * 0.1,
        duration: 0.6
      }
    })
  };
  export const darkModeAnimation = {
    initial: {
      x: 100,
      opacity: 0,
      rotate: -45
    },
    animate: {
      x: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.8,
        duration: 0.7
      }
    }
  };
  export const loginButtonAnimation = {
    initial: {
      x: 100,
      opacity: 0,
      scale: 0.8
    },
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 22,
        delay: 0.9,
        duration: 0.8
      }
    }
  };