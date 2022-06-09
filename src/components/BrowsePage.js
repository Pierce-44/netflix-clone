import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import firebaseConfig from './fireBaseConfig';
import SignInPage from './SignInPage';
import Row from './Row';
import requests from './requests';
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

export default BrowsePage;
