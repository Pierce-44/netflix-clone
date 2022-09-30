import React from 'react';

export default function useHeaderBackground() {
  const [changeColor, setChangeColor] = React.useState(false);

  function handleScroll() {
    if (window.pageYOffset > 0) {
      setChangeColor(true);
    } else {
      setChangeColor(false);
    }
  }

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return changeColor;
}
