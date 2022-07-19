<div align="center">
  <img src="https://openmoji.org/data/color/svg/1F4D1.svg" height="75px"/>
</div>

# Netflix React Clone App
A Netflix clone app that was built with React, CSS, and HTML, that utilises FireBase for authentication, and WEBM api to gather movies/series data. This app was designed, developed and conducted to be submitted as my assignment for <img src="https://www.theodinproject.com/assets/icons/odin-icon-b5b31c073f7417a257003166c98cc23743654715305910c068b93a3bf4d3065d.svg"  width="20" height="20"> [The Odin Project Fullstack JavaScript Final Project](https://www.theodinproject.com/lessons/node-path-javascript-javascript-final-project)

![netflixGif](https://user-images.githubusercontent.com/96740762/179763864-59a1151e-ed3c-484e-b3e6-05646e1cddb2.gif)

<br/>

## Built With:
<div>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" title="JavaScript" alt="JavaScript" width="35" height="35"/>&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" title="HTML5" alt="HTML" width="35" height="35"/>&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"  title="CSS3" alt="CSS" width="35" height="35"/>&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" title="React" alt="React" width="35" height="35"/>&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" title="Firebase" alt="Firebase" width="35" height="35"/>&nbsp;
</div>
<br/>

## Features:
- Sign up and log in with an email through FireBase authentication.
- Carousel that can infinitely loop through movies and series in both direction without the need to return in the opposite direction when you get to the end of the carousel.
- When hovering over a movie a pop-up is generated that autoplays the YouTube movie trailer as well as displays information related to the movie.
- Playing a movie opens a separate full screen page that plays the movie (YouTube trailer)
<br/>

## How To Use:

1. Open the live app at the following address:

   [`https://netflix-clone-model.web.app/`](https://netflix-clone-model.web.app/)

3. Register with a throwaway email address and password:

![netflixSignUp](https://user-images.githubusercontent.com/96740762/179787912-753b522b-150b-4300-9b7e-f97242722127.gif)

- This creates a user through FireBase authentication, your user details can now be used to log in and out of the application.
<br/>

## How to Install and Run the Project Locally:
#### - Please follow the following steps if you would like to install and run the porject locally on http://localhost:3000/:

1. Get a free API Key at 

   [`https://example.com`](https://example.com) 

2. Clone the repository to your local folder of choice
   ```sh
   git clone git@github.com:Pierce-44/netflix-clone.git
   ```


3. Within `src/components/requests.js` replace 
    ```js
    import api from '../api/APIKEY';
    ```
   with the following constant that includes your created API key from section 1
   ```js
   const api = 'ENTER YOUR API';
   ```

4. Install NPM packages
   ```sh
   npm install
   ```

5. Start the app on your localhost
   ```js
   npm start
   ```
