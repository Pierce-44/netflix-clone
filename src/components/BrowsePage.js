/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-boolean-value */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import firebaseConfig from './fireBaseConfig';
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
  const [movie, setMovie] = useState([]);
  const [headerBackground, setHeaderBackground] = useState(false);
  const [displayProfile, setDisplayProfile] = useState(false);

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

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    async function fetchData() {
      const request = await axios.get(requests.fetchTrending);
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
          <div
            className="billBoardImg"
            style={{
              backgroundImage: `url(
              "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
            )`,
            }}
          />
          <div className="billBoardGradient" />
          <div className="billBoardBlurr" />
        </div>
        <div className="billBoardInfoContainer">
          <h1 className="billBoardTitle">
            {movie?.original_title || movie?.original_name || movie?.name}
          </h1>
          <p className="billBoardOverview">{movie?.overview}</p>
          <button type="button" className="billBoardBtnContainer playButton">
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
        <Row
          title="Trending Now"
          fetchURL={requests.fetchTrending}
          imagePath="backdrop_path"
          topRow="leftArrowBlurrId"
        />
        <Row
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
        <Row
          title="Netflix Origionals"
          fetchURL={requests.fetchNetflixOrigionals}
          imagePath="backdrop_path"
        />
        <Row
          title="Animation Movies"
          fetchURL={requests.fetchAnimationMovies}
          imagePath="backdrop_path"
        />
        <Row
          title="Action Movies"
          fetchURL={requests.fetchActionMovies}
          imagePath="backdrop_path"
        />
        <Row
          title="Comedy Movies"
          fetchURL={requests.fetchComedyMovies}
          imagePath="backdrop_path"
        />
        <Row
          title="Horror Movies"
          fetchURL={requests.fetchHorrorMovies}
          imagePath="backdrop_path"
        />
        <Row
          title="Romance Movies"
          fetchURL={requests.fetchRomanceMovies}
          imagePath="backdrop_path"
        />
        <Row
          title="Sience Fiction"
          fetchURL={requests.fetchSienceFiction}
          imagePath="backdrop_path"
        />
        <Row
          title="War Movies"
          fetchURL={requests.fetchWarMovies}
          imagePath="backdrop_path"
        />
        <Row
          title="Documentaries"
          fetchURL={requests.fetchDocumentaries}
          imagePath="backdrop_path"
        />
        <Row
          title="Western Movies"
          fetchURL={requests.fetchWesternMovies}
          imagePath="backdrop_path"
        />
      </div>
    </div>
  );
}

export default BrowsePage;
