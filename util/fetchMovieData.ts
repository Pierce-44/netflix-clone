import { requests } from './requests';
import { RowData } from '../typings';

export default async function fetchMovieData() {
  const [
    fetchTrending,
    fetchNetflixOrigionals,
    fetchTopRated,
    fetchActionMovies,
    fetchAnimationMovies,
    fetchComedyMovies,
    fetchHorrorMovies,
    fetchRomanceMovies,
    fetchWarMovies,
    fetchSienceFiction,
    fetchDocumentaries,
    fetchWesternMovies,
  ]: RowData[] = await Promise.all([
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchNetflixOrigionals).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchAnimationMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchWarMovies).then((res) => res.json()),
    fetch(requests.fetchSienceFiction).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
    fetch(requests.fetchWesternMovies).then((res) => res.json()),
  ]);

  return [
    fetchTrending,
    fetchNetflixOrigionals,
    fetchTopRated,
    fetchActionMovies,
    fetchAnimationMovies,
    fetchComedyMovies,
    fetchHorrorMovies,
    fetchRomanceMovies,
    fetchWarMovies,
    fetchSienceFiction,
    fetchDocumentaries,
    fetchWesternMovies,
  ];
}

export const sectionsNameArray = [
  'Trending',
  'Netflix Origionals',
  'Top Rated',
  'Action Movies',
  'Animation Movies',
  'Comedy Movies',
  'Horror Movies',
  'Romance Movies',
  'War Movies',
  'Sience Fiction',
  'Documentaries',
  'Western Movies',
  'My List',
];
