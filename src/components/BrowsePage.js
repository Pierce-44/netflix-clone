import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import firebaseConfig from './fireBaseConfig';
import SignInPage from './SignInPage';
import requests from './requests';

initializeApp(firebaseConfig);
const auth = getAuth();

function BrowsePage() {
  const [userStatus, setUserStatus] = useState(false);
  console.log(requests);

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
    <div>
      <p style={{ color: 'black' }}>BROWSE PAGE</p>
      <button type="button" onClick={() => handleSignOut()}>
        Sign out
      </button>
    </div>
  );
}

export default BrowsePage;
