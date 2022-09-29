/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

export default function useRandomNumber() {
  const [randomNumber, setRandomNumber] = React.useState<null | number>(null);

  React.useEffect(() => {
    if (randomNumber) return;

    setRandomNumber(Math.floor(Math.random() * 19));
  }, []);

  return randomNumber;
}
