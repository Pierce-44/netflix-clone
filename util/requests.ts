import { api } from './api';

const baseURL = 'https://api.themoviedb.org/3/';

export const requests = {
  fetchTrending: `${baseURL}trending/all/week?api_key=${api}&language=en-US`,
  fetchNetflixOrigionals: `${baseURL}discover/tv?api_key=${api}&with_networks-213`,
  fetchTopRated: `${baseURL}movie/top_rated?api_key=${api}&language=en-US`,
  fetchActionMovies: `${baseURL}discover/movie?api_key=${api}&language=en-US&with_genres=28`,
  fetchAnimationMovies: `${baseURL}discover/movie?api_key=${api}&language=en-US&with_genres=16`,
  fetchComedyMovies: `${baseURL}discover/movie?api_key=${api}&language=en-US&with_genres=35`,
  fetchHorrorMovies: `${baseURL}discover/movie?api_key=${api}&language=en-US&with_genres=27`,
  fetchRomanceMovies: `${baseURL}discover/movie?api_key=${api}&language=en-US&with_genres=10749`,
  fetchWarMovies: `${baseURL}discover/movie?api_key=${api}&language=en-US&with_genres=10752`,
  fetchSienceFiction: `${baseURL}discover/movie?api_key=${api}&language=en-US&with_genres=878`,
  fetchDocumentaries: `${baseURL}discover/movie?api_key=${api}&language=en-US&with_genres=99`,
  fetchWesternMovies: `${baseURL}discover/movie?api_key=${api}&language=en-US&with_genres=37`,
};
