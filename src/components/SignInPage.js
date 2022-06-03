/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link } from 'react-router-dom';
import logo from '../images/netflixLogo.svg';
import '../styles/SignInPage.css';

function SignInPage() {
  const cardImage =
    'https://firebasestorage.googleapis.com/v0/b/netflix-clone-model.appspot.com/o/storyCard.jpg?alt=media&token=850ee71a-6cbb-4b57-8195-f0e7740ba15a';

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
        <form action="" className="signInPageFormContainer">
          <h1 className="signInPageTitle">Sign In</h1>
          <input type="text" id="signInPageEmail" className="signInPageInput" />
          <label className="signInPageLabelEmail" htmlFor="signInPageEmail">
            Email
          </label>
          <p className="signInPageValidationText">Email is required!</p>
          <input
            type="text"
            id="signInPagePassword"
            className="signInPageInput"
          />
          <label
            className="signInPageLabelPassword"
            htmlFor="signInPagePassword"
          >
            Password
          </label>
          <p className="signInPageValidationText">Password is required!</p>
          <button className="signInPageSubmitBtn" type="button">
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
