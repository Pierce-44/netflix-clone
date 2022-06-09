/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import firebaseConfig from './fireBaseConfig';
import axios from './axios';
import SignInPage from './SignInPage';
import requests from './requests';
import arrowRight from '../images/arrowRight.svg';
import arrowLeft from '../images/arrowLeft.svg';
import '../styles/BrowsePage.css';

initializeApp(firebaseConfig);
const auth = getAuth();

function BrowsePage() {
  const [userStatus, setUserStatus] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserStatus(true);
    }
  });

  return (
    <div>
      <section>{userStatus ? <BrowseMain /> : <SignInPage />}</section>
    </div>
  );
}

function BrowseMain() {
  const navigate = useNavigate();

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate('/login');
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  }

  return (
    <div className="browsePageMain">
      <div className="billBoard">
        <h1>BILLBOARD</h1>
      </div>
      <Row title="Trending Now" fetchURL={requests.fetchTrending} />
      <Row
        title="Netflix Origionals"
        fetchURL={requests.fetchNetflixOrigionals}
      />
      <Row title="Top Rated" fetchURL={requests.fetchTopRated} />
      <Row title="Action Movies" fetchURL={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchURL={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchURL={requests.fetchDocumentaries} />
      <button type="button" onClick={() => handleSignOut()}>
        Sign out
      </button>
    </div>
  );
}

function Row({ title, fetchURL }) {
  const baseUrl = 'https://image.tmdb.org/t/p/w400/';
  const [movies, setMovies] = useState([]);
  const [arrowState, setArrowState] = useState('arrowHide');
  const [leftArrowState, setLeftArrowState] = useState('arrowHide');
  const [stage, setStage] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [rightClickCount, setRightClickCount] = useState(0);
  const [transformRightCSS, setTransformRightCSS] = useState('');
  const [transform, setTransform] = useState('');
  const [transContainerOneRight, setTransContainerOneRight] = useState('');
  const [transContainerTwoRight, setTransContainerTwoRight] = useState('');
  const [transContainerThreeRight, setTransContainerThreeRight] = useState('');
  const [transContainerFourRight, setTransContainerFourRight] = useState('');
  const [rightClicked, setRightClicked] = useState(false);

  function handleLeftArrow() {
    if (stage === 0) {
      setArrowState('arrowShow');
    } else {
      setArrowState('arrowShow');
      setLeftArrowState('arrowShow');
    }
  }

  function handleSubTransfrom() {
    if (stage === 0) {
      setStage(1);
    } else if (stage === 1) {
      setTransContainerOneRight(`translateX(calc(90.6vw * 4 * ${multiplier}))`);
      setStage(2);
    } else if (stage === 2) {
      setTransContainerTwoRight(`translateX(calc(90.6vw * 4 * ${multiplier}))`);
      setStage(3);
    } else if (stage === 3) {
      setTransContainerThreeRight(
        `translateX(calc(90.6vw * 4 * ${multiplier}))`
      );
      setStage(4);
    } else if (stage === 4) {
      setTransContainerFourRight(
        `translateX(calc(90.6vw * 4 * ${multiplier}))`
      );
      setStage(1);
      setMultiplier(multiplier + 1);
    }
  }

  function handleCarouselRightClick() {
    if (rightClicked === true) {
      // nothing
    } else {
      setRightClickCount(rightClickCount + 1);
      handleSubTransfrom();
      setRightClicked(true);
      setTimeout(() => {
        setRightClicked(false);
      }, 600);
    }
  }

  function handleCarouselLeftClick() {
    if (stage === 1) {
      setTransform('transformRightOne');
      setStage(0);
    } else if (stage === 2) {
      setTransform('transformRightTwo');
      setStage(1);
    } else if (stage === 3) {
      setTransform('transformRightThree');
      setStage(2);
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

  return (
    <div className="row">
      <h2 className="rowTitle">{title}</h2>
      <div
        className="rowMain"
        onMouseEnter={() => handleLeftArrow()}
        onMouseLeave={() => {
          setArrowState('arrowHide');
          setLeftArrowState('arrowHide');
        }}
      >
        <div
          className="arrowContainerLeft"
          onClick={() => handleCarouselLeftClick()}
        >
          <div className="arrowDivLeft">
            {/* <img
              src={arrowLeft}
              alt="arrow"
              className={`arrowImg ${leftArrowState}`}
            /> */}
          </div>
        </div>
        <div
          className={`rowUpperContainer ${transform}`}
          style={{
            transform: `translateX(calc(-90.6vw * ${rightClickCount}))`,
            transitionDuration: '0.6s',
            transitionTimingFunction: 'ease-in-out',
          }}
        >
          <div
            className="rowContainer"
            style={{
              transform: transContainerOneRight,
            }}
          >
            {movies.slice(0, 5).map((movie, index) => (
              <div key={`key${index}`} className="rowDiv">
                <img
                  src={baseUrl + movie.backdrop_path}
                  alt={movie.original_title}
                  className="rowImage"
                />
              </div>
            ))}
          </div>
          <div
            className="rowContainer"
            style={{
              transform: transContainerTwoRight,
            }}
          >
            {movies.slice(5, 10).map((movie, index) => (
              <div key={`key${index}`} className="rowDiv">
                <img
                  src={baseUrl + movie.backdrop_path}
                  alt={movie.original_title}
                  className="rowImage"
                />
              </div>
            ))}
          </div>
          <div
            className="rowContainer"
            style={{
              transform: transContainerThreeRight,
            }}
          >
            {movies.slice(10, 15).map((movie, index) => (
              <div key={`key${index}`} className="rowDiv">
                <img
                  src={baseUrl + movie.backdrop_path}
                  alt={movie.original_title}
                  className="rowImage"
                />
              </div>
            ))}
          </div>
          <div
            className="rowContainer"
            style={{
              transform: transContainerFourRight,
            }}
          >
            {movies.slice(15, 20).map((movie, index) => (
              <div key={`key${index}`} className="rowDiv">
                <img
                  src={baseUrl + movie.backdrop_path}
                  alt={movie.original_title}
                  className="rowImage"
                />
              </div>
            ))}
          </div>
        </div>
        <div
          className="arrowContainer"
          onClick={() => setInterval(handleCarouselRightClick(), 5000)}
        >
          <div className="arrowDiv">
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

// /* ----------------------------------CAROUSEL---------------------------------- */

// /* ---------TRANSFORM LEFT--------- */

// .transformLeftOne {
//   transform: translateX(-90.6vw);
// }

// .transformLeftTwo {
//   transform: translateX(calc(-90.6vw * 2));
// }

// .transformLeftThree {
//   transform: translateX(calc(-90.6vw * 3));
// }

// .transformLeftFour {
//   transform: translateX(calc(-90.6vw * 4));
// }

// /* ---------TRANSFORM RIGHT--------- */

// .transformRightOne {
//   transform: translateX(0vw);
// }

// .transformRightTwo {
//   transform: translateX(-90.6vw);
// }

// .transformRightThree {
//   transform: translateX(calc(-90.6vw * 2));
// }

// /* -------------------SUB TRANSFORMATIONS------------------- */

// .transContainerOneRight {
//   transform: translateX(calc(90.6vw * 4));
// }

// .transContainerTwoRight {
//   transform: translateX(calc(90.6vw * 4));
// }

// .transContainerThreeRight {
//   transform: translateX(calc(90.6vw * 4));
// }

// .transContainerFourRight {
//   transform: translateX(calc(90.6vw * 4));
// }

export default BrowsePage;
