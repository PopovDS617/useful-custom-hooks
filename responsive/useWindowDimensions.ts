import React, { useState, useEffect } from 'react';

export const useWindowDimensions = () => {
  const [windowSize, setWindowSize] = useState({ height: null, width: null });

  useEffect(() => {
    const onWindowResize = () => {
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    window.addEventListener('resize', onWindowResize);

    onWindowResize();

    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return {
    width: windowSize.width,
    height: windowSize.height,
  };
};
