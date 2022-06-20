import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useMemo } from 'react';
import App from './App';
import BrowsePage from './components/BrowsePage';
import SignInPage from './components/SignInPage';
import dataProps from './components/Context';
import RegistrationPage from './components/RegistrationPage';
import WatchPage from './components/WatchPage';

const RouteSwitch = () => {
  const [signUpEmail, setSignUpEmail] = useState('');
  const [movieURL, setMovieURL] = useState();

  const dataPropsContainer = useMemo(() => ({
    signUpEmail,
    setSignUpEmail,
    movieURL,
    setMovieURL,
  }));

  return (
    <BrowserRouter>
      <dataProps.Provider value={dataPropsContainer}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/watch" element={<WatchPage />} />
        </Routes>
      </dataProps.Provider>
    </BrowserRouter>
  );
};

export default RouteSwitch;
