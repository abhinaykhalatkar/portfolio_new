import React, { useState ,createContext} from "react";

export const PageAnimationContext = createContext();

export function PageAnimationProvider(props) {
 const [scrollDirection, setScrollDirection] = useState(0);
 const pageVariants = {
    initial: {
      opacity: 0,
      x: scrollDirection ? "100%" : "-100%",
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        ease: "easeOut", 
        duration: 0.5, 
      },
    },
    exit: {
      opacity: 0,
      x: scrollDirection ? "-100%" : "100%", 
      transition: {
        ease: "easeIn", 
        duration: 0.5, 
      },
    },
  };
  
  const pageTransition = {
    duration: 0.5, 
    type: "tween",
    ease: "easeInOut",
  };
  function handleSetScrollDirection(val) {
    setScrollDirection(val);
  }

  return (
    <PageAnimationContext.Provider value={{handleSetScrollDirection,pageVariants,pageTransition}}>
        {props.children}
    </PageAnimationContext.Provider>
  );
}
