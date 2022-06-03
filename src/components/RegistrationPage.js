/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/netflixLogo.svg';
import '../styles/RegistrationPage.css';

function RegistrationPage() {
  const [hideSectionOne, SetHideSectionOne] = useState('showSectionOne');
  const [showSectionTwo, SetShowSectionTwo] = useState('hideSectionTwo');

  return (
    <div className="registartionPage">
      <Header />
      <div className={hideSectionOne}>
        <SectionOne
          SetHideSectionOne={SetHideSectionOne}
          SetShowSectionTwo={SetShowSectionTwo}
        />
      </div>
      <div className={showSectionTwo}>
        <SectionTwo />
      </div>
    </div>
  );
}

function SectionOne({ SetHideSectionOne, SetShowSectionTwo }) {
  const devicesImage =
    'https://firebasestorage.googleapis.com/v0/b/netflix-clone-model.appspot.com/o/Devices.png?alt=media&token=7373eba2-74cc-497a-bb26-f053ff7f5a84';

  return (
    <div className="sectionOneContainer">
      <img src={devicesImage} alt="devices" className="devicesImage" />
      <h1>Finish setting up your account</h1>
      <p>
        Netflix is personalized for you. Create a password to watch on any
        device at any time.
      </p>
      <button
        type="button"
        onClick={() => {
          SetHideSectionOne('hideSectionOne');
          SetShowSectionTwo('showSectionTwo');
        }}
      >
        Next
      </button>
    </div>
  );
}

function SectionTwo() {
  return (
    <div className="sectionTwoContainer">
      <h1>Create a password to proceed to the app</h1>
      <p>
        Just a few more steps and you are done!
        <br />
        We hate paperwork, too.
      </p>
      <form action="" className="registrationPageForm">
        <input
          type="text"
          id="email"
          className="submitEmailInput inputHeight"
        />
        <label htmlFor="email" className="registrationPageLabelEmail">
          Email
        </label>
        <p id="inputValidationText">Email is required!</p>
        <input
          type="text"
          id="password"
          className="submitEmailInput inputHeight"
          style={{ marginTop: '20px' }}
        />
        <label htmlFor="password" className="registrationPageLabelPassword">
          Add a password
        </label>
        <p id="inputValidationText">Password is required!</p>
        <button type="button">Next</button>
      </form>
    </div>
  );
}

function Header() {
  return (
    <div className="registrationPageHeader">
      <Link to="/" className="logoLink">
        <img src={logo} alt="logo" className="registrationPageLogo" />
      </Link>
      <Link to="/login" className="signInLink">
        <p className="registrationPageSignIn">Sign In</p>
      </Link>
    </div>
  );
}

export default RegistrationPage;
