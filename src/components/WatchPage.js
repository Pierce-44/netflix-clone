/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseConfig from './fireBaseConfig';
import SignInPage from './SignInPage';
import dataProps from './Context';
import netflixLogo from '../images/netflixLogo.svg';
import leaveArrow from '../images/leaveArrow.svg';
import '../styles/WatchPage.css';

initializeApp(firebaseConfig);
const auth = getAuth();

function WatchPage() {
  const [userStatus, setUserStatus] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserStatus(true);
    }
  });

  return (
    <div>
      <section>{userStatus ? <Watch /> : <SignInPage />}</section>
    </div>
  );
}

function Watch() {
  const { movieURL } = useContext(dataProps);
  const [loader, setLoader] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (movieURL === undefined) {
      navigate('/browse');
    } else if (movieURL === null) {
      setLoader(false);
    } else {
      setLoader(true);
    }
  }, []);

  return (
    <div>
      <section className="watchPageMain">
        {loader ? (
          <div>
            <div
              className="watchLogoContainer"
              onClick={() => navigate('/browse')}
            >
              <img className="watchLogoNetflix" src={netflixLogo} alt="home" />
              <img src={leaveArrow} alt="leave" />
            </div>
            <ReactPlayer url={movieURL} width="100%" height="99.4vh" controls />
          </div>
        ) : (
          <div className="watchPageNoMovieContainer">
            <div
              className="watchLogoContainer"
              onClick={() => navigate('/browse')}
            >
              <img className="watchLogoNetflix" src={netflixLogo} alt="home" />
              <img src={leaveArrow} alt="leave" />
            </div>
            <h1 className="watchPageFailText">
              Sorry this movie is not currently available
            </h1>
          </div>
        )}
      </section>
    </div>
  );
}

export default WatchPage;
