<div align="center">
  <img src="https://raw.githubusercontent.com/Pierce-44/netflix-clone/main/public/favicon.png" height="60px"/>
</div>

# Netflix Clone
Description

View a live version of the app using the link below:

[`https://netphlix.vercel.app/`](https://netphlix.vercel.app/)

<br/>

## Built With:
<div>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" title="Typescript" alt="Typescript" width="35" height="35"/>&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" title="nextjs" alt="nextjs" width="35" height="35"/>&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" title="React" alt="React" width="35" height="35"/>&nbsp;
  <img src="https://raw.githubusercontent.com/nextauthjs/next-auth/main/docs/static/img/logo/logo.png" title="NextAuth" alt="NextAuth" height="35"/>&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" title="Tailwind" alt="Tailwind" width="35" height="35"/>&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" title="Firebase" alt="Firebase" width="35" height="35"/>&nbsp;
  <img src="https://i.pinimg.com/originals/17/dd/84/17dd84fe75c8ba1ca26aa18b3570b65b.png" title="vercel" alt="vercel"  height="35"/>&nbsp;
</div>

<br/>

## View a Range of Movies and Series
- Utilises TMDb api to get movies and series by genres, latest releases, most popular, etc.
- Utilises ReactPlayer to display the corresponding YouTube trailers based on the fetched TMDb api data.

![default](https://user-images.githubusercontent.com/96740762/195638923-46185d08-dd4b-4236-8dd9-2cbfb767dc9e.gif)

<br/>

## Save Movies to My List
- Users can save selected movies to their "My List".
- Allows users to keep track of movies or series they may want to watch in the future.

![myList](https://user-images.githubusercontent.com/96740762/195639688-c7f24cd4-d587-47fe-90a6-96156ae1f05d.gif)

<br/>

## NextAuth Authentication
- Utilises NextAuth, allowing users to be authenticated server side through getServerSideProps.
- Users can access the app through their registered Google account.

![nextAuth](https://user-images.githubusercontent.com/96740762/195640451-fd4f305e-0ed5-4239-8f4e-8ab4545cb866.gif)

<br/>

## Responsive Design
- Fully responsive design to allow the app to work on both computers, notepads, mobile phones, etc.

![mobile](https://user-images.githubusercontent.com/96740762/195640592-c8f7c871-ca64-4b36-8261-1bbfdb859000.gif)

<br/>

## How to Install and Run the Project Locally:
#### - Please follow the following steps if you would like to install and run the porject locally on http://localhost:3000/:

1. Clone the repository to your local folder of choice
   ```sh
   git clone git@github.com:Pierce-44/netflix-clone.git
   ```
   
<br/>

2. Create the following file `util/firbaseConfig.ts` and paste in your Firebase configuration, which was assigned to your project when you created it on firebase and can be found under your project settings on Firebase. It should resemble the following example:
    ```js
    // Your web app's Firebase configuration should resemble the following EXAMPLE:
    
    const firebaseConfig = {
      apiKey: "AIzaSyA97-R5P4bEwjV0efHt3hLs3bc32ns4shs",
      authDomain: "instagram-clone-ph.firebaseapp.com",
      projectId: "instagram-clone-ph",
      storageBucket: "instagram-clone-ph.appspot.com",
      messagingSenderId: "554003582327",
      appId: "1:554003582327:web:97667da84152c9ff7aa572"
    };
    ```
    
    <br/>
    
3. Create a free account with [TMDB](https://www.themoviedb.org/signup) and then follow their instructions in the linked guide below to create your own personal API key:

   [`TMDB API Guide`](https://developers.themoviedb.org/3/getting-started/introduction) 

   <br/>

4. Create the following file `util/firbaseConfig.ts` and add your personal TMDB api key from section 3
   ```js
   export const api = 'ENTER YOUR API HERE';
   ```

5. Install NPM packages
   ```sh
   npm install
   ```
   
    <br/>

6. Start the app on your localhost
   ```js
   npm run dev
   ```



