/* eslint-disable @typescript-eslint/no-non-null-assertion */
interface Props {
  factor: number;
  factorLimit: number | null;
  right: boolean;
  left: boolean;
  setFactor: React.Dispatch<React.SetStateAction<number>>;
  setShowLeftNavTab: React.Dispatch<React.SetStateAction<boolean>>;
  setShowRightNavTab: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function handleCarousel({
  factor,
  factorLimit,
  right,
  left,
  setFactor,
  setShowLeftNavTab,
  setShowRightNavTab,
}: Props) {
  if ((right && factor === factorLimit!) || (left && factor === 0)) {
    return;
  }

  // if moving to the last right section hide the right tab
  if (right && factor === factorLimit! + 1) {
    setShowRightNavTab(false);
  }
  // if moving to the last left section hide the left tab
  if (left && factor === -1) {
    setShowLeftNavTab(false);
  }
  if (right) {
    setFactor(factor - 1);
    setShowLeftNavTab(true);
  }
  if (left) {
    setShowRightNavTab(true);
    setFactor(factor + 1);
  }
}
