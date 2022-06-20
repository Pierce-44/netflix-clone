/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import movieTrailer from 'movie-trailer';
import ReactPlayer from 'react-player';
import axios from './axios';
import dataProps from './Context';
import arrowRight from '../images/arrowRight.svg';
import arrowLeft from '../images/arrowLeft.svg';
import {
  handleRightClick,
  handleLeftClick,
  baseCoordsLower,
  baseCoordsMiddle,
  baseCoordsUpper,
} from './carousel';
import numberImages from './images';
import likeImage from '../images/like.svg';
import likedImage from '../images/liked.svg';
import playImage from '../images/play.svg';
import muteIcon from '../images/muteIcon.svg';
import unMuteIcon from '../images/unMuteIcon.svg';

function Row({
  rowID,
  rowHover,
  title,
  fetchURL,
  imagePath,
  topRow,
  rowHeight,
  imageHeight,
  topTwentyImages,
  topTwentyRow,
}) {
  const baseUrl = 'https://image.tmdb.org/t/p/w400/';
  const [movies, setMovies] = useState([]);
  const [arrowState, setArrowState] = useState('arrowHide');
  const [leftArrowState, setLeftArrowState] = useState('arrowHide');
  const [carouselActiveStatus, setcarouselActiveStatus] = useState(false);
  const [centerElement, setCenterElement] = useState(1);
  const [clicked, setClicked] = useState(false);
  const [numberOfBoxElements, setNumberOfBoxElements] = useState(4);
  const [rowBoxes, setRowBoxes] = useState([]);
  const size = useWindowSize();
  const [topRowLeftArrowStyle, setTopRowLeftArrowStyle] = useState(topRow);
  const [popUpImageUrl, setPopUpImageUrl] = useState();
  const [popUpActive, setPopUpActive] = useState(false);
  const [trailerID, setTrailerID] = useState('');
  const [leftPosition, setLeftPosition] = useState('');
  const [topPosition, setTopPosition] = useState('');
  const [elements, setElements] = useState([]);

  const boxRef = useRef();

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
      setTopRowLeftArrowStyle('');
      setClicked(true);
      setTimeout(() => {
        setClicked(false);
      }, 600);
    }
  }

  function handleScroll() {
    setPopUpActive(false);
  }

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  useEffect(() => {
    setCenterElement(1);

    if (size.width > 1100) {
      setNumberOfBoxElements(4);
      setRowBoxes([0, 5, 10, 15, 20]);
      setElements(baseCoordsUpper);
    } else if (size.width < 1100 && size.width > 600) {
      setNumberOfBoxElements(5);
      setRowBoxes([0, 4, 8, 12, 16, 20]);
      setElements(baseCoordsMiddle);
    } else if (size.width < 600) {
      setNumberOfBoxElements(10);
      setRowBoxes([0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]);
      setElements(baseCoordsLower);
    }
  }, [size]);

  useEffect(() => {
    if (rowHover !== rowID) {
      setPopUpActive(false);
    }
  }, [rowHover]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="row" onMouseLeave={() => setPopUpActive(false)}>
      <div className="rowHeader">
        <h2 className="rowTitle">{title}</h2>
        <div className="sliderContainer">
          {elements.map((element, index) => (
            <div
              key={`sliderBarKey${index}`}
              className={`sliderElements slider${element}`}
            />
          ))}
        </div>
      </div>

      <div
        className="rowMain"
        onMouseEnter={() => {
          handleLeftArrow();
        }}
        onMouseLeave={() => {
          setArrowState('arrowHide');
          setLeftArrowState('arrowHide');
        }}
      >
        <div
          className="arrowContainer arrowDivLeftPadding"
          id={topRowLeftArrowStyle}
        >
          <div
            className={`arrowDiv ${leftArrowState}`}
            id="rowLeftArrow"
            onClick={() => handleClickDelayLeft()}
          >
            <img
              src={arrowLeft}
              alt="arrow"
              className={`arrowImg ${leftArrowState}`}
            />
          </div>
        </div>
        <div className="rowUpperContainer rowHeight" id={rowHeight}>
          {elements.map((element, indexUpper) => (
            <div className="rowContainer" id={element} key={`key${indexUpper}`}>
              {movies
                .slice(rowBoxes[indexUpper], rowBoxes[indexUpper + 1])
                .map((movie, index) => (
                  <div key={`key${index}`} className="rowDiv">
                    <img
                      src={baseUrl + movie[imagePath]}
                      alt={
                        movie?.original_title ||
                        movie?.original_name ||
                        movie?.name
                      }
                      className="rowImage"
                      id={imageHeight}
                      ref={boxRef}
                      tmbdid={
                        movie?.original_title ||
                        movie?.original_name ||
                        movie?.name
                      }
                      onMouseEnter={(e) => {
                        setPopUpImageUrl(e.target.getAttribute('src'));
                        setLeftPosition(e.target.getBoundingClientRect().left);
                        setTopPosition(e.target.getBoundingClientRect().top);
                        setTrailerID(e.target.getAttribute('tmbdid'));

                        setTimeout(() => {
                          setPopUpActive(true);
                        }, 1);
                      }}
                    />
                  </div>
                ))}

              {topTwentyRow ? (
                <div className="topTwentyContainer">
                  {numberImages
                    .slice(rowBoxes[indexUpper], rowBoxes[indexUpper + 1])
                    .map((image, index) => (
                      <div
                        key={`key${index}`}
                        className="rowDiv topTenImagesDiv"
                      >
                        <img
                          src={image}
                          alt=""
                          id={topTwentyImages}
                          className="hideTopTwentyImages"
                        />
                      </div>
                    ))}
                </div>
              ) : (
                <div />
              )}
            </div>
          ))}
        </div>
        <div className="arrowContainer arrowDivRightPadding">
          <div className="arrowDiv" onClick={() => handleClickDelayRight()}>
            <img
              src={arrowRight}
              alt="arrow"
              className={`arrowImg ${arrowState}`}
            />
          </div>
        </div>
      </div>
      <section
        className="popUpContainer"
        style={{
          top: topPosition,
          left: leftPosition,
        }}
      >
        {popUpActive ? (
          <PopUp
            popUpImageUrl={popUpImageUrl}
            setPopUpActive={setPopUpActive}
            trailerID={trailerID}
            imageHeight={imageHeight}
          />
        ) : (
          <div />
        )}
      </section>
    </div>
  );
}

function PopUp({ popUpImageUrl, setPopUpActive, trailerID, imageHeight }) {
  const [playTrailer, setPlayTrailer] = useState('showPopUpimage');
  const [trailerAddress, setTrailerAddress] = useState();
  const [trailerError, setTrailerError] = useState('');
  const [showTrailerError, setShowTrailerError] = useState('');
  const [randomNumb, setRandomNumb] = useState();
  const [renderTrailerDiv, setRenderTrailerDiv] = useState(false);
  const [muteStatus, setMuteStatus] = useState(true);
  const [likedStatus, setLikedStatus] = useState(false);
  const { setMovieURL } = useContext(dataProps);

  const navigate = useNavigate();

  useEffect(() => {
    setRandomNumb(Math.floor(Math.random() * 101));

    movieTrailer(trailerID || '')
      .then((response) => {
        setTrailerAddress(response);
        setMovieURL(response);
        if (response === null) {
          setTrailerError('Sorry trailer is currently not available');
        }
      })
      .catch((error) => console.log(error));

    setTimeout(() => {
      setPlayTrailer('hidePopUpimage');
      setShowTrailerError('showTrailerError');
      setRenderTrailerDiv(true);
    }, 2000);
  }, []);

  return (
    <div
      className="popUpExpansion testBlurr"
      onMouseLeave={() => {
        setPopUpActive(false);
      }}
    >
      <div className="popUpTrailerContainer">
        {renderTrailerDiv ? (
          <div className="reactPlayerContianer">
            <ReactPlayer
              id="fullScreenVideo"
              url={trailerAddress}
              width="100%"
              height="100%"
              volume={1}
              muted={muteStatus}
              playing
              loop
            />

            <div
              className="videoPlayerMuteDiv"
              onClick={() => setMuteStatus(!muteStatus)}
            >
              <img
                className="muteImage"
                src={muteStatus ? muteIcon : unMuteIcon}
                alt="mute"
              />
            </div>
          </div>
        ) : (
          <div />
        )}

        <img
          className={`popUpImage ${playTrailer}`}
          id={`${imageHeight}PopUp`}
          src={popUpImageUrl}
          alt=""
        />
        <p className={`trailerError ${showTrailerError}`}>{trailerError}</p>
      </div>

      <div className="popUpLowerContainer">
        <div className="popUpButtonsContainer">
          <button
            type="button"
            className="playButtonTwo"
            onClick={() => navigate('/watch')}
          >
            <img src={playImage} alt="play" className="playButtonTwoImage" />
          </button>
          <button
            type="button"
            className="likeButton"
            onClick={() => setLikedStatus(!likedStatus)}
          >
            <img
              src={likedStatus ? likedImage : likeImage}
              alt="like"
              className="likeImage"
            />
          </button>
        </div>
        <div>
          <p className="matchText">{`${randomNumb}% Match`}</p>
          <p className="moviePopUpName">{trailerID}</p>
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
