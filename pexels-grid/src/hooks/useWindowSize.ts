'use client';
import { useEffect, useState } from "react";

export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<{width?:number,height?:number,columnWidth?:number}>({
    width: undefined,
    height: undefined,
    columnWidth: undefined
  });
  const getColumnWidth = () => {
    if (typeof window === "undefined") {
      return 640;
    }
    let columnWidth =
      window?.innerWidth < 1536
        ? window?.innerWidth * 0.33
        : window?.innerWidth / 4;
    if (window?.innerWidth < 1280) columnWidth = window?.innerWidth / 2;

    // if (window.innerWidth < 640) columnWidth = window.innerWidth;
    return columnWidth;
  };

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        columnWidth: getColumnWidth()
      });
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);
     
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}