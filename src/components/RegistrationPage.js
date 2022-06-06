/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './fireBaseConfig';
import dataProps from './Context';
import { emailValidate, passwordValidate } from './validate';
import logo from '../images/netflixLogo.svg';
import '../styles/RegistrationPage.css';

initializeApp(firebaseConfig);

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
  const { signUpEmail } = useContext(dataProps);
  const { setSignUpEmail } = useContext(dataProps);
  const [emailFormErrors, setEmailFormErrors] = useState('');
  const [password, setPassword] = useState('');
  const [passwordFormErrors, setPasswordFormErrors] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [errorUnderlineClass, setErrorUnderlineClass] =
    useState('hideErrorBox');
  const [errorUnderlineClassPW, setErrorUnderlineClassPW] =
    useState('hideErrorBox');

  const auth = getAuth();

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    // submitToFireBase();
    if (passwordFormErrors === '' && emailFormErrors === '') {
      createUserWithEmailAndPassword(auth, signUpEmail, password)
        .then((userCredential, error) => {
          // Signed in
          if (error === undefined) {
            setIsSubmit(true);
          }
        })
        .catch((error) => {
          setPasswordFormErrors(error.message);
        });
    }
  }

  useEffect(() => {
    if (isSubmit) {
      navigate('/browse');
    }
    if (emailFormErrors === '') {
      setErrorUnderlineClass('hideErrorBox');
    }
    if (passwordFormErrors === '') {
      setErrorUnderlineClassPW('hideErrorBox');
    }

    setEmailFormErrors(
      emailValidate(signUpEmail, setErrorUnderlineClass, 'showErrorBox')
    );
    setPasswordFormErrors(
      passwordValidate(password, setErrorUnderlineClassPW, 'showErrorBox')
    );
  }, [isSubmit, signUpEmail, password]);

  return (
    <div className="sectionTwoContainer">
      <h1>Create a password to proceed to the app</h1>
      <p>
        Just a few more steps and you are done!
        <br />
        We hate paperwork, too.
      </p>
      <form
        action=""
        className="registrationPageForm"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="email"
          id="email"
          className={`submitEmailInput inputHeight ${errorUnderlineClass}`}
          value={signUpEmail}
          onChange={(e) => setSignUpEmail(e.target.value)}
        />
        <label htmlFor="email" className="registrationPageLabelEmail">
          Email
        </label>
        <p id="inputValidationText">{emailFormErrors}</p>
        <input
          type="password"
          id="password"
          className={`submitEmailInput inputHeight ${errorUnderlineClassPW}`}
          style={{ marginTop: '20px' }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="password" className="registrationPageLabelPassword">
          Add a password
        </label>
        <p id="inputValidationText">{passwordFormErrors}</p>
        <button type="submit">Next</button>
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
