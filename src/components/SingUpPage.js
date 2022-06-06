/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/netflixLogo.svg';
import downLoadAnimation from '../images/download-icon.gif';
import '../styles/SignUpPage.css';
import dataProps from './Context';
import { emailValidate } from './validate';

function SignUpPage() {
  const cardImage =
    'https://firebasestorage.googleapis.com/v0/b/netflix-clone-model.appspot.com/o/storyCard.jpg?alt=media&token=850ee71a-6cbb-4b57-8195-f0e7740ba15a';
  const tvImage =
    'https://firebasestorage.googleapis.com/v0/b/netflix-clone-model.appspot.com/o/tv.png?alt=media&token=249b2eff-7c31-407e-b53f-e04560c0afca';
  const tvVideo =
    'https://firebasestorage.googleapis.com/v0/b/netflix-clone-model.appspot.com/o/video-tv-one.m4v?alt=media&token=866333e5-0375-47d0-980f-d78530cd399d';
  const mobileImage =
    'https://firebasestorage.googleapis.com/v0/b/netflix-clone-model.appspot.com/o/mobile.jpg?alt=media&token=34904fda-e5eb-4c1e-83d7-afa7ac704a28';
  const boxShotImage =
    'https://firebasestorage.googleapis.com/v0/b/netflix-clone-model.appspot.com/o/boxshot.png?alt=media&token=50e0de42-5d29-4ed7-b1f9-70884767d4ba';
  const appleTvImage =
    'https://firebasestorage.googleapis.com/v0/b/netflix-clone-model.appspot.com/o/appleTV.png?alt=media&token=8d399675-e9bf-4668-be72-0a5733acbb71';
  const tvVideoTwo =
    'https://firebasestorage.googleapis.com/v0/b/netflix-clone-model.appspot.com/o/video-tv-two.m4v?alt=media&token=f9c38858-830a-4c5f-901a-d27bcb6cda4e';
  const storyBoardPropImg =
    'https://firebasestorage.googleapis.com/v0/b/netflix-clone-model.appspot.com/o/storyBoardPropImg.png?alt=media&token=20a5cc40-7853-4434-a861-39a84632b6b0';

  const [svgHideShowState, setSvgHideShowState] = useState({
    questionOne: 'svgFAQClosed',
    questionTwo: 'svgFAQClosed',
    questionThree: 'svgFAQClosed',
    questionFour: 'svgFAQClosed',
    questionFive: 'svgFAQClosed',
    questionSix: 'svgFAQClosed',
  });

  const [hideShowFAQText, setHideShowFAQText] = useState({
    questionOne: 'hideFAQText',
    questionTwo: 'hideFAQText',
    questionThree: 'hideFAQText',
    questionFour: 'hideFAQText',
    questionFive: 'hideFAQText',
    questionSix: 'hideFAQText',
  });

  function handleFAQTabs(e) {
    const svgIdentifier = e.target.id;

    if (svgHideShowState[svgIdentifier] === 'svgFAQClosed') {
      setSvgHideShowState({
        ...svgHideShowState,
        [svgIdentifier]: 'svgFAQOpen',
      });

      setHideShowFAQText({
        ...hideShowFAQText,
        [svgIdentifier]: 'showFAQText',
      });
    } else if (svgHideShowState[svgIdentifier] === 'svgFAQOpen') {
      setSvgHideShowState({
        ...svgHideShowState,
        [svgIdentifier]: 'svgFAQClosed',
      });

      setHideShowFAQText({
        ...hideShowFAQText,
        [svgIdentifier]: 'hideFAQText',
      });
    }
  }

  return (
    <div className="SignUpPageApp">
      <div className="SignUpPageHeader">
        <img className="SignUpPageLogo" src={logo} alt="" />
        <Link to="/login" className="linkText">
          <p className="signInBtnHeader">Sign In</p>
        </Link>
      </div>
      <div className="SignUpPageMain">
        <div className="SignUpPageSectionOne">
          <img className="imageStoryBoard" src={cardImage} alt="story board" />
          <div className="SignUpPageOpacity" />
        </div>
        <div className="upperSignUpForm">
          <div className="upperSignUpFormContainer">
            <h1>Unlimited movies, TV shows, and more.</h1>
            <h2>Watch anywhere. Cancel anytime.</h2>
            <SignUpForm />
          </div>
        </div>
        <div className="storyBoardContainer">
          <div className="storyBoardBorder">
            <div className="SignUpPageSections">
              <div className="storyCardContainerUpper">
                <h1 className="storyCardTitle">Enjoy on your TV.</h1>
                <h2 className="storyCardText">
                  Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV,
                  Blu-ray players, and more.
                </h2>
              </div>
              <div className="storyCardContainerLower">
                <img className="tvImage" src={tvImage} alt="tv" />
                <div className="storyCardVideoContainer">
                  <video autoPlay muted loop className="storyCardVideo">
                    <source src={tvVideo} type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
          <div className="storyBoardBorder">
            <div className="SignUpPageSections flexReverse">
              <div className="storyCardContainerUpper">
                <h1 className="storyCardTitle">
                  Download your shows to watch offline.
                </h1>
                <h2 className="storyCardText">
                  Save your favorites easily and always have something to watch.
                </h2>
              </div>
              <div className="storyCardContainerLower">
                <img className="tvImage" src={mobileImage} alt="tv" />
                <div className="mobileDevice">
                  <div>
                    <img
                      className="boxShotImg"
                      src={boxShotImage}
                      alt="box shot"
                    />
                  </div>
                  <div>
                    <p>Downloading...</p>
                  </div>
                  <div>
                    <img
                      className="downLoadIcon"
                      src={downLoadAnimation}
                      alt="download icon"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="storyBoardBorder">
            <div className="SignUpPageSections">
              <div className="storyCardContainerUpper">
                <h1 className="storyCardTitle">Watch everywhere.</h1>
                <h2 className="storyCardText">
                  Stream unlimited movies and TV shows on your phone, tablet,
                  laptop, and TV without paying more.
                </h2>
              </div>
              <div className="storyCardContainerLower">
                <img className="tvImage" src={appleTvImage} alt="tv" />
                <div className="storyCardVideoContainer">
                  <video autoPlay muted loop className="storyCardVideo appleTv">
                    <source src={tvVideoTwo} type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
          <div className="storyBoardBorder">
            <div className="SignUpPageSections flexReverse">
              <div className="storyCardContainerUpper">
                <h1 className="storyCardTitle">Create profiles for kids.</h1>
                <h2 className="storyCardText">
                  Send kids on adventures with their favorite characters in a
                  space made just for them—free with your membership.
                </h2>
              </div>
              <div className="storyCardContainerLower">
                <img
                  className="tvImage"
                  src={storyBoardPropImg}
                  alt="story board prop"
                />
              </div>
            </div>
          </div>
          <div className="storyBoardBorder">
            <div className="FAQContainer">
              <h1 className="storyCardTitle">Frequently Asked Questions</h1>
              <ul className="FAQList">
                <li className="FAQListItem">
                  <button
                    type="button"
                    className="FAQQuestion"
                    id="questionOne"
                    onClick={(e) => handleFAQTabs(e)}
                  >
                    What is Netflix?
                    <svg
                      viewBox="0 0 26 26"
                      className={svgHideShowState.questionOne}
                      id="questionOne"
                      onClick={(e) => handleFAQTabs(e)}
                    >
                      <path d="M10.5 9.3L1.8 0.5 0.5 1.8 9.3 10.5 0.5 19.3 1.8 20.5 10.5 11.8 19.3 20.5 20.5 19.3 11.8 10.5 20.5 1.8 19.3 0.5 10.5 9.3Z" />
                    </svg>
                  </button>
                  <div className={hideShowFAQText.questionOne}>
                    <p>
                      Netflix is a streaming service that offers a wide variety
                      of award-winning TV shows, movies, anime, documentaries,
                      and more on thousands of internet-connected devices.{' '}
                      <br />
                      <br />
                      You can watch as much as you want, whenever you want
                      without a single commercial - all for one low monthly
                      price. There's always something new to discover and new TV
                      shows and movies are added every week!
                    </p>
                  </div>
                </li>
                <li className="FAQListItem">
                  <button
                    type="button"
                    className="FAQQuestion"
                    id="questionTwo"
                    onClick={(e) => handleFAQTabs(e)}
                  >
                    How much does Netflix cost?
                    <svg
                      viewBox="0 0 26 26"
                      className={svgHideShowState.questionTwo}
                      id="questionTwo"
                      onClick={(e) => handleFAQTabs(e)}
                    >
                      <path d="M10.5 9.3L1.8 0.5 0.5 1.8 9.3 10.5 0.5 19.3 1.8 20.5 10.5 11.8 19.3 20.5 20.5 19.3 11.8 10.5 20.5 1.8 19.3 0.5 10.5 9.3Z" />
                    </svg>
                  </button>
                  <div className={hideShowFAQText.questionTwo}>
                    <p>
                      Watch Netflix on your smartphone, tablet, Smart TV,
                      laptop, or streaming device, all for one fixed monthly
                      fee. Plans range from BRL25.90 to BRL55.90 a month. No
                      extra costs, no contracts.
                    </p>
                  </div>
                </li>
                <li className="FAQListItem">
                  <button
                    type="button"
                    className="FAQQuestion"
                    id="questionThree"
                    onClick={(e) => handleFAQTabs(e)}
                  >
                    Where can I watch?
                    <svg
                      viewBox="0 0 26 26"
                      className={svgHideShowState.questionThree}
                      id="questionThree"
                      onClick={(e) => handleFAQTabs(e)}
                    >
                      <path d="M10.5 9.3L1.8 0.5 0.5 1.8 9.3 10.5 0.5 19.3 1.8 20.5 10.5 11.8 19.3 20.5 20.5 19.3 11.8 10.5 20.5 1.8 19.3 0.5 10.5 9.3Z" />
                    </svg>
                  </button>
                  <div className={hideShowFAQText.questionThree}>
                    <p>
                      Watch anywhere, anytime. Sign in with your Netflix account
                      to watch instantly on the web at netflix.com from your
                      personal computer or on any internet-connected device that
                      offers the Netflix app, including smart TVs, smartphones,
                      tablets, streaming media players and game consoles. <br />
                      <br />
                      You can also download your favorite shows with the iOS,
                      Android, or Windows 10 app. Use downloads to watch while
                      you're on the go and without an internet connection. Take
                      Netflix with you anywhere.
                    </p>
                  </div>
                </li>
                <li className="FAQListItem">
                  <button
                    type="button"
                    className="FAQQuestion"
                    id="questionFour"
                    onClick={(e) => handleFAQTabs(e)}
                  >
                    How do I cancel?
                    <svg
                      viewBox="0 0 26 26"
                      className={svgHideShowState.questionFour}
                      id="questionFour"
                      onClick={(e) => handleFAQTabs(e)}
                    >
                      <path d="M10.5 9.3L1.8 0.5 0.5 1.8 9.3 10.5 0.5 19.3 1.8 20.5 10.5 11.8 19.3 20.5 20.5 19.3 11.8 10.5 20.5 1.8 19.3 0.5 10.5 9.3Z" />
                    </svg>
                  </button>
                  <div className={hideShowFAQText.questionFour}>
                    <p>
                      Netflix is flexible. There are no pesky contracts and no
                      commitments. You can easily cancel your account online in
                      two clicks. There are no cancellation fees - start or stop
                      your account anytime.
                    </p>
                  </div>
                </li>
                <li className="FAQListItem">
                  <button
                    type="button"
                    className="FAQQuestion"
                    id="questionFive"
                    onClick={(e) => handleFAQTabs(e)}
                  >
                    What can I watch on Netflix?
                    <svg
                      viewBox="0 0 26 26"
                      className={svgHideShowState.questionFive}
                      id="questionFive"
                      onClick={(e) => handleFAQTabs(e)}
                    >
                      <path d="M10.5 9.3L1.8 0.5 0.5 1.8 9.3 10.5 0.5 19.3 1.8 20.5 10.5 11.8 19.3 20.5 20.5 19.3 11.8 10.5 20.5 1.8 19.3 0.5 10.5 9.3Z" />
                    </svg>
                  </button>
                  <div className={hideShowFAQText.questionFive}>
                    <p>
                      Netflix has an extensive library of feature films,
                      documentaries, TV shows, anime, award-winning Netflix
                      originals, and more. Watch as much as you want, anytime
                      you want.
                    </p>
                  </div>
                </li>
                <li className="FAQListItem">
                  <button
                    type="button"
                    className="FAQQuestion"
                    id="questionSix"
                    onClick={(e) => handleFAQTabs(e)}
                  >
                    Is Netflix good for kids?
                    <svg
                      viewBox="0 0 26 26"
                      className={svgHideShowState.questionSix}
                      id="questionSix"
                      onClick={(e) => handleFAQTabs(e)}
                    >
                      <path d="M10.5 9.3L1.8 0.5 0.5 1.8 9.3 10.5 0.5 19.3 1.8 20.5 10.5 11.8 19.3 20.5 20.5 19.3 11.8 10.5 20.5 1.8 19.3 0.5 10.5 9.3Z" />
                    </svg>
                  </button>
                  <div className={hideShowFAQText.questionSix}>
                    <p>
                      The Netflix Kids experience is included in your membership
                      to give parents control while kids enjoy family-friendly
                      TV shows and movies in their own space.
                      <br />
                      <br />
                      Kids profiles come with PIN-protected parental controls
                      that let you restrict the maturity rating of content kids
                      can watch and block specific titles you don't want kids to
                      see.
                    </p>
                  </div>
                </li>
              </ul>
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignUpForm() {
  const { signUpEmail } = useContext(dataProps);
  const { setSignUpEmail } = useContext(dataProps);
  const [formErrors, setFormErrors] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [errorUnderlineClass, setErrorUnderlineClass] =
    useState('hideErrorUnderline');

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setFormErrors(
      emailValidate(signUpEmail, setErrorUnderlineClass, 'showErrorUnderline')
    );
    setIsSubmit(true);
  }

  useEffect(() => {
    if (formErrors === '' && isSubmit) {
      // submitToFireBase();
      navigate('/registration');
    }
    if (formErrors === '') {
      setErrorUnderlineClass('hideErrorUnderline');
    }
    setFormErrors(
      emailValidate(signUpEmail, setErrorUnderlineClass, 'showErrorUnderline')
    );
  });

  return (
    <form
      action=""
      className="submitEmailContainer"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div>
        <h3 className="submitEmailSubTitle">
          Ready to watch? Enter your email to create or restart your membership.
        </h3>
      </div>
      <div className="submitEmailInputContainer">
        <input
          type="text"
          value={signUpEmail}
          onChange={(e) => setSignUpEmail(e.target.value)}
          className={`submitEmailInput ${errorUnderlineClass}`}
          id="submitEmail"
        />
        <label htmlFor="submitEmail" className="submitEmailLabel">
          Email address
        </label>
        <button className="emailSubmitButton" type="submit">
          <p>Get Started</p>
          <svg
            viewBox="0 0 6 12"
            xmlns="http://www.w3.org/2000/svg"
            className="nextArrowSvg"
          >
            <desc>chevron</desc>
            <path
              d="M.61 1.312l.78-.624L5.64 6l-4.25 5.312-.78-.624L4.36 6z"
              fill="white"
            />
          </svg>
        </button>
      </div>
      <div className="SignUpPageFormErrors">
        <p>{formErrors}</p>
      </div>
    </form>
  );
}

export default SignUpPage;
