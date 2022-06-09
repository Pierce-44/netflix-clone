/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from './axios';
import arrowRight from '../images/arrowRight.svg';
import arrowLeft from '../images/arrowLeft.svg';
import { handleRightClick, handleLeftClick } from './carousel';

function Row({ title, fetchURL }) {
  const baseUrl = 'https://image.tmdb.org/t/p/w400/';
  const [movies, setMovies] = useState([]);
  const [arrowState, setArrowState] = useState('arrowHide');
  const [leftArrowState, setLeftArrowState] = useState('arrowHide');
  const [carouselActiveStatus, setcarouselActiveStatus] = useState(false);
  const [centerElement, setCenterElement] = useState(1);
  const [clicked, setClicked] = useState(false);
  const [numberOfBoxElements, setNumberOfBoxElements] = useState(4);
  const [numberOfImages, setNumberOfImages] = useState(5);
  const [rowUpperContainerHeight, setRowUpperContainerHeight] = useState('');
  const [rowBoxes, setRowBoxes] = useState([]);
  const size = useWindowSize();
  const baseCoords = [
    'centerPositionMain',
    'rightPosition',
    'centerPositionHidden',
    'centerPositionHidden',
    'centerPositionHidden',
    'centerPositionHidden',
    'centerPositionHidden',
    'centerPositionHidden',
    'centerPositionHidden',
    'centerPositionHidden',
  ];
  const [elements, setElements] = useState(baseCoords);

  function handleLeftArrow() {
    if (carouselActiveStatus === false) {
      setArrowState('arrowShow');
    } else {
      setArrowState('arrowShow');
      setLeftArrowState('arrowShow');
    }
  }

  function handleClickDelayLeft() {
    if (clicked === true) {
      // do nothing
    } else {
      handleLeftClick(
        setElements,
        setCenterElement,
        centerElement,
        numberOfBoxElements
      );
      setClicked(true);
      setTimeout(() => {
        setClicked(false);
      }, 600);
    }
  }

  function handleClickDelayRight() {
    if (clicked === true) {
      // do nothing
    } else {
      handleRightClick(
        setcarouselActiveStatus,
        setLeftArrowState,
        setElements,
        setCenterElement,
        centerElement,
        numberOfBoxElements
      );
      setClicked(true);
      setTimeout(() => {
        setClicked(false);
      }, 600);
    }
  }

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      // console.log(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  useEffect(() => {
    if (size.width > 1100) {
      setNumberOfBoxElements(4);
      setNumberOfImages(5);
      setRowUpperContainerHeight('lowerRowHeight');
      setRowBoxes([0, 5, 10, 15, 20]);
      setCenterElement(1);
      setElements(baseCoords);
    } else if (size.width < 1100 && size.width > 600) {
      setNumberOfBoxElements(5);
      setNumberOfImages(4);
      setRowUpperContainerHeight('averageRowHeight');
      setRowBoxes([0, 4, 8, 12, 16, 20]);
      setElements(baseCoords);
    } else if (size.width < 600) {
      setNumberOfBoxElements(10);
      setNumberOfImages(2);
      setRowUpperContainerHeight('maxRowHeight');
      setRowBoxes([0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]);
      setElements(baseCoords);
    }
  }, [size]);

  return (
    <div className="row">
      <p>{size.width}px</p>
      <h2 className="rowTitle">{title}</h2>
      <div
        className="rowMain"
        onMouseEnter={() => handleLeftArrow()}
        onMouseLeave={() => {
          setArrowState('arrowHide');
          setLeftArrowState('arrowHide');
        }}
      >
        <div className="arrowContainer">
          <div className="arrowDiv" onClick={() => handleClickDelayLeft()}>
            <img
              src={arrowLeft}
              alt="arrow"
              className={`arrowImg ${leftArrowState}`}
            />
          </div>
        </div>
        <div className="rowUpperContainer" id={rowUpperContainerHeight}>
          {elements.map((element, indexUpper) => (
            <div className="rowContainer" id={element} key={`key${indexUpper}`}>
              {movies
                .slice(rowBoxes[indexUpper], rowBoxes[indexUpper + 1])
                .map((movie, index) => (
                  <div
                    key={`key${index}`}
                    className="rowDiv"
                    style={{ width: `calc(88.6vw / ${numberOfImages})` }}
                  >
                    <img
                      src={baseUrl + movie.backdrop_path}
                      alt={movie.original_title}
                      className="rowImage"
                      style={{ width: `calc(88.6vw / ${numberOfImages})` }}
                    />
                  </div>
                ))}
            </div>
          ))}
        </div>
        <div className="arrowContainer">
          <div className="arrowDiv" onClick={() => handleClickDelayRight()}>
            <img
              src={arrowRight}
              alt="arrow"
              className={`arrowImg ${arrowState}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Hook
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
}

export default Row;
