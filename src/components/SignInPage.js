/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './fireBaseConfig';
import { emailValidate, passwordValidate } from './validate';
import logo from '../images/netflixLogo.svg';
import '../styles/SignInPage.css';

initializeApp(firebaseConfig);
const auth = getAuth();

function SignInPage() {
  const cardImage =
    'https://firebasestorage.googleapis.com/v0/b/netflix-clone-model.appspot.com/o/storyCard.jpg?alt=media&token=850ee71a-6cbb-4b57-8195-f0e7740ba15a';

  const [email, setEmail] = useState('');
  const [emailFormErrors, setEmailFormErrors] = useState('');
  const [password, setPassword] = useState('');
  const [passwordFormErrors, setPasswordFormErrors] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [errorUnderlineClass, setErrorUnderlineClass] =
    useState('hideErrorUnderline');
  const [errorUnderlineClassPW, setErrorUnderlineClassPW] =
    useState('hideErrorUnderline');

  const navigate = useNavigate();

  function handleSignIn(e) {
    e.preventDefault();

    if (passwordFormErrors === '' && emailFormErrors === '') {
      signInWithEmailAndPassword(auth, email, password)
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
      setErrorUnderlineClass('hideErrorUnderlineSignInPage');
    }
    if (passwordFormErrors === '') {
      setErrorUnderlineClassPW('hideErrorUnderlineSignInPage');
    }

    setEmailFormErrors(
      emailValidate(email, setErrorUnderlineClass, 'showErrorUnderline')
    );
    setPasswordFormErrors(
      passwordValidate(password, setErrorUnderlineClassPW, 'showErrorUnderline')
    );
  }, [isSubmit, email, password]);

  return (
    <div className="signInPage">
      <div className="signInPageBackgroundImg">
        <img src={cardImage} alt="" />
      </div>
      <div className="signInPageHeader">
        <Link to="/" className="signInPageLogo">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="signInPageForm">
        <form
          action=""
          className="signInPageFormContainer"
          onSubmit={(e) => handleSignIn(e)}
        >
          <h1 className="signInPageTitle">Sign In</h1>
          <input
            type="email"
            id="signInPageEmail"
            className={`signInPageInput ${errorUnderlineClass}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="signInPageLabelEmail" htmlFor="signInPageEmail">
            Email
          </label>
          <p className="signInPageValidationText">{emailFormErrors}</p>
          <input
            type="password"
            id="signInPagePassword"
            className={`signInPageInput ${errorUnderlineClassPW}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            className="signInPageLabelPassword"
            htmlFor="signInPagePassword"
          >
            Password
          </label>
          <p className="signInPageValidationText">{passwordFormErrors}</p>
          <button className="signInPageSubmitBtn" type="submit">
            Sign In
          </button>
          <div className="signInPageFormLowerDiv">
            <p className="signInPageGreyText">New to Netflix?</p>
            <Link to="/registration" className="signInPageLink">
              <p className="signInPageLink">Sign up now.</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignInPage;
