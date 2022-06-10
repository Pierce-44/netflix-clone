import api from '../api/APIKEY';

const requests = {
  fetchTrending: `trending/all/week?api_key=${api}&language=en-US`,
  fetchNetflixOrigionals: `/discover/tv?api_key=${api}&with_networks-213`,
  fetchTopRated: `/movie/top_rated?api_key=${api}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${api}&language=en-US&with_genres=28`,
  fetchAnimationMovies: `/discover/movie?api_key=${api}&language=en-US&with_genres=16`,
  fetchComedyMovies: `/discover/movie?api_key=${api}&language=en-US&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${api}&language=en-US&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${api}&language=en-US&with_genres=10749`,
  fetchWarMovies: `/discover/movie?api_key=${api}&language=en-US&with_genres=10752`,
  fetchSienceFiction: `/discover/movie?api_key=${api}&language=en-US&with_genres=878`,
  fetchDocumentaries: `/discover/movie?api_key=${api}&language=en-US&with_genres=99`,
  fetchWesternMovies: `/discover/movie?api_key=${api}&language=en-US&with_genres=37`,
};

export default requests;
