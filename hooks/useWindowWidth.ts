/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const hasWindow = typeof window !== 'undefined';

  if (!hasWindow) return;
  const { innerWidth: width, innerHeight: height } = window;

  return {
    width,
    height,
  };
}

export default function useWindowWidth({
  setFactor,
  setFactorLimit,
  setShowLeftNavTab,
  setShowRightNavTab,
}: {
  setFactorLimit: React.Dispatch<React.SetStateAction<number | null>>;
  setFactor: React.Dispatch<React.SetStateAction<number>>;
  setShowLeftNavTab: React.Dispatch<React.SetStateAction<boolean>>;
  setShowRightNavTab: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  function handleResize() {
    setWindowDimensions(getWindowDimensions());
  }

  useEffect(() => {
    if (!windowDimensions) return;

    if (windowDimensions.width < 640) {
      setFactorLimit(-9);
    } else if (windowDimensions.width > 640 && windowDimensions.width < 1024) {
      setFactorLimit(-4);
    } else {
      setFactorLimit(-3);
    }

    setFactor(0);
    setShowLeftNavTab(false);
    setShowRightNavTab(true);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowDimensions]);
}
