function fourBoxElementsRight(elementsSet, elementCenterSet, elementCenter) {
  if (elementCenter === 1) {
    elementsSet([
      'leftPosition',
      'centerPositionMain',
      'rightPosition',
      'centerPositionHidden',
    ]);
    elementCenterSet(2);
  } else if (elementCenter === 2) {
    elementsSet([
      'centerPositionHidden',
      'leftPosition',
      'centerPositionMain',
      'rightPosition',
    ]);
    elementCenterSet(3);
  } else if (elementCenter === 3) {
    elementsSet([
      'rightPosition',
      'centerPositionHidden',
      'leftPosition',
      'centerPositionMain',
    ]);
    elementCenterSet(4);
  } else if (elementCenter === 4) {
    elementsSet([
      'centerPositionMain',
      'rightPosition',
      'centerPositionHidden',
      'leftPosition',
    ]);
    elementCenterSet(1);
  }
}

function fiveBoxElementsRight(elementsSet, elementCenterSet, elementCenter) {
  if (elementCenter === 1) {
    elementsSet([
      'leftPosition',
      'centerPositionMain',
      'rightPosition',
      'centerPositionHidden',
      'centerPositionHidden',
    ]);
    elementCenterSet(2);
  } else if (elementCenter === 2) {
    elementsSet([
      'centerPositionHidden',
      'leftPosition',
      'centerPositionMain',
      'rightPosition',
      'centerPositionHidden',
    ]);
    elementCenterSet(3);
  } else if (elementCenter === 3) {
    elementsSet([
      'centerPositionHidden',
      'centerPositionHidden',
      'leftPosition',
      'centerPositionMain',
      'rightPosition',
    ]);
    elementCenterSet(4);
  } else if (elementCenter === 4) {
    elementsSet([
      'rightPosition',
      'centerPositionHidden',
      'centerPositionHidden',
      'leftPosition',
      'centerPositionMain',
    ]);
    elementCenterSet(5);
  } else if (elementCenter === 5) {
    elementsSet([
      'centerPositionMain',
      'rightPosition',
      'centerPositionHidden',
      'centerPositionHidden',
      'leftPosition',
    ]);
    elementCenterSet(1);
  }
}

function tenBoxElementsRight(elementsSet, elementCenterSet, elementCenter) {
  if (elementCenter === 1) {
    elementsSet([
      'leftPosition',
      'centerPositionMain',
      'rightPosition',
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
    ]);
    elementCenterSet(2);
  } else if (elementCenter === 2) {
    elementsSet([
      'centerPositionHidden',
      'leftPosition',
      'centerPositionMain',
      'rightPosition',
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
    ]);
    elementCenterSet(3);
  } else if (elementCenter === 3) {
    elementsSet([
      'centerPositionHidden',
      'centerPositionHidden',
      'leftPosition',
      'centerPositionMain',
      'rightPosition',
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
    ]);
    elementCenterSet(4);
  } else if (elementCenter === 4) {
    elementsSet([
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
      'leftPosition',
      'centerPositionMain',
      'rightPosition',
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
    ]);
    elementCenterSet(5);
  } else if (elementCenter === 5) {
    elementsSet([
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
      'leftPosition',
      'centerPositionMain',
      'rightPosition',
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
    ]);
    elementCenterSet(6);
  } else if (elementCenter === 6) {
    elementsSet([
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
      'leftPosition',
      'centerPositionMain',
      'rightPosition',
      'centerPositionHidden',
      'centerPositionHidden',
    ]);
    elementCenterSet(7);
  } else if (elementCenter === 7) {
    elementsSet([
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
      'leftPosition',
      'centerPositionMain',
      'rightPosition',
      'centerPositionHidden',
    ]);
    elementCenterSet(8);
  } else if (elementCenter === 8) {
    elementsSet([
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
      'leftPosition',
      'centerPositionMain',
      'rightPosition',
    ]);
    elementCenterSet(9);
  } else if (elementCenter === 9) {
    elementsSet([
      'rightPosition',
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
      'leftPosition',
      'centerPositionMain',
    ]);
    elementCenterSet(10);
  } else if (elementCenter === 10) {
    elementsSet([
      'centerPositionMain',
      'rightPosition',
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
      'centerPositionHidden',
      'leftPosition',
    ]);
    elementCenterSet(1);
  }
}

function handleRightClick(
  carouselActiveStatusSet,
  leftArrowStateSet,
  elementsSet,
  elementCenterSet,
  elementCenter,
  boxElements
) {
  carouselActiveStatusSet(true);
  leftArrowStateSet('arrowShow');

  if (boxElements === 4) {
    fourBoxElementsRight(elementsSet, elementCenterSet, elementCenter);
  } else if (boxElements === 5) {
    fiveBoxElementsRight(elementsSet, elementCenterSet, elementCenter);
  } else if (boxElements === 10) {
    tenBoxElementsRight(elementsSet, elementCenterSet, elementCenter);
  }
}

//  ---------------------- LEFT CLICK ----------------------

function fourBoxElementsLeft(elementsSet, elementCenterSet, elementCenter) {
  if (elementCenter === 1) {
    elementsSet([
      'rightPositionVariant',
      'centerPositionHiddenVariant',
      'leftPositionVariant',
      'centerPositionMainVariant',
    ]);
    elementCenterSet(4);
  } else if (elementCenter === 2) {
    elementsSet([
      'centerPositionMainVariant',
      'rightPositionVariant',
      'centerPositionHiddenVariant',
      'leftPositionVariant',
    ]);
    elementCenterSet(1);
  } else if (elementCenter === 3) {
    elementsSet([
      'leftPositionVariant',
      'centerPositionMainVariant',
      'rightPositionVariant',
      'centerPositionHiddenVariant',
    ]);
    elementCenterSet(2);
  } else if (elementCenter === 4) {
    elementsSet([
      'centerPositionHiddenVariant',
      'leftPositionVariant',
      'centerPositionMainVariant',
      'rightPositionVariant',
    ]);
    elementCenterSet(3);
  }
}

function fiveBoxElementsLeft(elementsSet, elementCenterSet, elementCenter) {
  if (elementCenter === 1) {
    elementsSet([
      'rightPositionVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'leftPositionVariant',
      'centerPositionMainVariant',
    ]);
    elementCenterSet(5);
  } else if (elementCenter === 2) {
    elementsSet([
      'centerPositionMainVariant',
      'rightPositionVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'leftPositionVariant',
    ]);
    elementCenterSet(1);
  } else if (elementCenter === 3) {
    elementsSet([
      'leftPositionVariant',
      'centerPositionMainVariant',
      'rightPositionVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
    ]);
    elementCenterSet(2);
  } else if (elementCenter === 4) {
    elementsSet([
      'centerPositionHiddenVariant',
      'leftPositionVariant',
      'centerPositionMainVariant',
      'rightPositionVariant',
      'centerPositionHiddenVariant',
    ]);
    elementCenterSet(3);
  } else if (elementCenter === 5) {
    elementsSet([
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'leftPositionVariant',
      'centerPositionMainVariant',
      'rightPositionVariant',
      'centerPositionHiddenVariant',
    ]);
    elementCenterSet(4);
  }
}

function tenBoxElementsLeft(elementsSet, elementCenterSet, elementCenter) {
  if (elementCenter === 1) {
    elementsSet([
      'rightPositionVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'leftPositionVariant',
      'centerPositionMainVariant',
    ]);
    elementCenterSet(10);
  } else if (elementCenter === 2) {
    elementsSet([
      'centerPositionMainVariant',
      'rightPositionVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'leftPositionVariant',
    ]);
    elementCenterSet(1);
  } else if (elementCenter === 3) {
    elementsSet([
      'leftPositionVariant',
      'centerPositionMainVariant',
      'rightPositionVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
    ]);
    elementCenterSet(2);
  } else if (elementCenter === 4) {
    elementsSet([
      'centerPositionHiddenVariant',
      'leftPositionVariant',
      'centerPositionMainVariant',
      'rightPositionVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
    ]);
    elementCenterSet(3);
  } else if (elementCenter === 5) {
    elementsSet([
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'leftPositionVariant',
      'centerPositionMainVariant',
      'rightPositionVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
    ]);
    elementCenterSet(4);
  } else if (elementCenter === 6) {
    elementsSet([
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'leftPositionVariant',
      'centerPositionMainVariant',
      'rightPositionVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
    ]);
    elementCenterSet(5);
  } else if (elementCenter === 7) {
    elementsSet([
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'leftPositionVariant',
      'centerPositionMainVariant',
      'rightPositionVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
    ]);
    elementCenterSet(6);
  } else if (elementCenter === 8) {
    elementsSet([
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'leftPositionVariant',
      'centerPositionMainVariant',
      'rightPositionVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
    ]);
    elementCenterSet(7);
  } else if (elementCenter === 9) {
    elementsSet([
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'leftPositionVariant',
      'centerPositionMainVariant',
      'rightPositionVariant',
      'centerPositionHiddenVariant',
    ]);
    elementCenterSet(8);
  } else if (elementCenter === 10) {
    elementsSet([
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'centerPositionHiddenVariant',
      'leftPositionVariant',
      'centerPositionMainVariant',
      'rightPositionVariant',
    ]);
    elementCenterSet(9);
  }
}

function handleLeftClick(
  elementsSet,
  elementCenterSet,
  elementCenter,
  boxElements
) {
  if (boxElements === 4) {
    fourBoxElementsLeft(elementsSet, elementCenterSet, elementCenter);
  } else if (boxElements === 5) {
    fiveBoxElementsLeft(elementsSet, elementCenterSet, elementCenter);
  } else if (boxElements === 10) {
    tenBoxElementsLeft(elementsSet, elementCenterSet, elementCenter);
  }
}

export { handleRightClick, handleLeftClick };
