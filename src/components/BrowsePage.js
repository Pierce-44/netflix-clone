/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-boolean-value */
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import movieTrailer from 'movie-trailer';
import ClipLoader from 'react-spinners/ClipLoader';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import firebaseConfig from './fireBaseConfig';
import dataProps from './Context';
import axios from './axios';
import SignInPage from './SignInPage';
import Row from './Row';
import requests from './requests';
import infoImg from '../images/info.svg';
import playImg from '../images/play.svg';
import profilePicture from '../images/profilePicture.png';
import logo from '../images/netflixLogo.svg';
import '../styles/BrowsePage.css';

initializeApp(firebaseConfig);
const auth = getAuth();

function BrowsePage() {
  const [userStatus, setUserStatus] = useState(false);
  const [loadStatus, setLoadStatus] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserStatus(true);
    } else {
      setLoadStatus(true);
    }
  });

  return (
    <div>
      {userStatus ? (
        <section>{userStatus ? <BrowseMain /> : <SignInPage />}</section>
      ) : (
        <section>{loadStatus ? <SignInPage /> : <LoaderPage />}</section>
      )}
    </div>
  );
}

function LoaderPage() {
  return (
    <div className="loadingPage">
      <ClipLoader color="red" size={100} />
    </div>
  );
}

function BrowseMain() {
  const navigate = useNavigate();
  const [movie, setMovie] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState('');
  const [headerBackground, setHeaderBackground] = useState(false);
  const [displayProfile, setDisplayProfile] = useState(false);
  const [rowHover, setRowHover] = useState('');
  const { setMovieURL } = useContext(dataProps);

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleScroll() {
    if (window.pageYOffset > 0) {
      setHeaderBackground(true);
    } else {
      setHeaderBackground(false);
    }
  }

  function handleScrollToTop() {
    window.scrollTo(0, 0);
  }

  function handleBillBoardMovie() {
    movieTrailer(
      movie?.original_title || movie?.original_name || movie?.name || ''
    )
      .then((response) => {
        setMovieURL(response);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    async function fetchData() {
      const request = await axios.get(requests.fetchActionMovies);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }
    fetchData();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="browsePageMain">
      <div className={loadingStatus}>
        <LoaderPage />
      </div>

      <div
        className={`browsePageHeader ${
          headerBackground && 'headerBackgroundDark'
        }`}
      >
        <div className="headerLogoContainer">
          <img
            className="browsePageHeaderLogo"
            src={logo}
            alt="netflix logo"
            onClick={() => handleScrollToTop()}
          />
        </div>
        <div
          className="headerProfilePicContainer"
          onMouseEnter={() => setDisplayProfile(true)}
          onMouseLeave={() => setDisplayProfile(false)}
        >
          <div className="headerProfilePicContainerLower">
            <img
              className="profilePictureHeaderImg"
              src={profilePicture}
              alt="profile"
            />
            <span className="headerArrow" />
          </div>
          <div
            className={`headerProfileTab ${displayProfile && 'showProfileTab'}`}
          >
            <div className="arrowTwoContainer">
              <span className="headerArrowTwo" />
            </div>
            <div
              className="signOutContainer"
              role="button"
              tabIndex="0"
              onClick={() => handleSignOut()}
            >
              <p className="signOutButton">Sign out of Netflix</p>
            </div>
          </div>
        </div>
      </div>
      <div className="billBoard">
        <div className="billBoardImgContainer">
          <img
            className="billBoardImg"
            src={`https://image.tmdb.org/t/p/w1280/${movie?.backdrop_path}`}
            alt=""
            onLoad={() => setLoadingStatus('hideLoaderPage')}
          />
          <div className="billBoardGradient" />
          <div className="billBoardBlurr" />
        </div>
        <div className="billBoardInfoContainer">
          <h1 className="billBoardTitle">
            {movie?.original_title || movie?.original_name || movie?.name}
          </h1>
          <p className="billBoardOverview">{movie?.overview}</p>
          <button
            type="button"
            className="billBoardBtnContainer playButton"
            onClick={() => {
              handleBillBoardMovie();
              navigate('/watch');
            }}
          >
            <div className="billBoardBtn">
              <img src={playImg} alt="play" />
              <p>Play</p>
            </div>
          </button>
          <button type="button" className="billBoardBtnContainer infoButton">
            <div className="billBoardBtn">
              <img src={infoImg} alt="more information" />
              <p>More Info</p>
            </div>
          </button>
        </div>
      </div>
      <div className="rowMasterContainer">
        <div
          onMouseEnter={() => setRowHover('row1')}
          onMouseLeave={() => setRowHover('')}
        >
          <Row
            rowID="row1"
            rowHover={rowHover}
            title="Action Movies"
            fetchURL={requests.fetchActionMovies}
            imagePath="backdrop_path"
            topRow="leftArrowBlurrId"
          />
        </div>
        <div
          onMouseEnter={() => setRowHover('row2')}
          onMouseLeave={() => setRowHover('')}
        >
          <Row
            rowID="row2"
            rowHover={rowHover}
            title="Top Rated"
            fetchURL={requests.fetchTopRated}
            imagePath="poster_path"
            topRow=""
            topRatedClass="topRatedClass"
            rowHeight="rowHeightLarge"
            imageHeight="verticalImage"
            topTwentyImages="topTwentyImages"
            topTwentyRow={true}
          />
        </div>
        <div
          onMouseEnter={() => setRowHover('row3')}
          onMouseLeave={() => setRowHover('')}
        >
          <Row
            rowID="row3"
            rowHover={rowHover}
            title="Netflix Origionals"
            fetchURL={requests.fetchNetflixOrigionals}
            imagePath="backdrop_path"
          />
        </div>

        <div
          onMouseEnter={() => setRowHover('row4')}
          onMouseLeave={() => setRowHover('')}
        >
          <Row
            rowID="row4"
            rowHover={rowHover}
            title="Animation Movies"
            fetchURL={requests.fetchAnimationMovies}
            imagePath="backdrop_path"
          />
        </div>

        <div
          onMouseEnter={() => setRowHover('row5')}
          onMouseLeave={() => setRowHover('')}
        >
          <Row
            rowID="row5"
            rowHover={rowHover}
            title="Popular on Netflix"
            fetchURL={requests.fetchTrending}
            imagePath="backdrop_path"
          />
        </div>

        <div
          onMouseEnter={() => setRowHover('row6')}
          onMouseLeave={() => setRowHover('')}
        >
          <Row
            rowID="row6"
            rowHover={rowHover}
            title="Comedy Movies"
            fetchURL={requests.fetchComedyMovies}
            imagePath="backdrop_path"
          />
        </div>

        <div
          onMouseEnter={() => setRowHover('row7')}
          onMouseLeave={() => setRowHover('')}
        >
          <Row
            rowID="row7"
            rowHover={rowHover}
            title="Horror Movies"
            fetchURL={requests.fetchHorrorMovies}
            imagePath="backdrop_path"
          />
        </div>

        <div
          onMouseEnter={() => setRowHover('row8')}
          onMouseLeave={() => setRowHover('')}
        >
          <Row
            rowID="row8"
            rowHover={rowHover}
            title="Romance Movies"
            fetchURL={requests.fetchRomanceMovies}
            imagePath="backdrop_path"
          />
        </div>

        <div
          onMouseEnter={() => setRowHover('row9')}
          onMouseLeave={() => setRowHover('')}
        >
          <Row
            rowID="row9"
            rowHover={rowHover}
            title="Sience Fiction"
            fetchURL={requests.fetchSienceFiction}
            imagePath="backdrop_path"
          />
        </div>

        <div
          onMouseEnter={() => setRowHover('row10')}
          onMouseLeave={() => setRowHover('')}
        >
          <Row
            rowID="row10"
            rowHover={rowHover}
            title="War Movies"
            fetchURL={requests.fetchWarMovies}
            imagePath="backdrop_path"
          />
        </div>

        <div
          onMouseEnter={() => setRowHover('row11')}
          onMouseLeave={() => setRowHover('')}
        >
          <Row
            rowID="row11"
            rowHover={rowHover}
            title="Documentaries"
            fetchURL={requests.fetchDocumentaries}
            imagePath="backdrop_path"
          />
        </div>

        <div
          onMouseEnter={() => setRowHover('row12')}
          onMouseLeave={() => setRowHover('')}
        >
          <Row
            rowID="row12"
            rowHover={rowHover}
            title="Western Movies"
            fetchURL={requests.fetchWesternMovies}
            imagePath="backdrop_path"
          />
        </div>
      </div>
    </div>
  );
}

export default BrowsePage;
