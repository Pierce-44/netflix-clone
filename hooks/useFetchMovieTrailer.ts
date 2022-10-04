/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { MovieInfo } from '../typings';
import { api } from '../util/api';

interface Props {
  movieInfo: MovieInfo;
  setTrailer: React.Dispatch<React.SetStateAction<null | number>>;
  setGenres: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function useFetchMovieTrailer({
  movieInfo,
  setTrailer,
  setGenres,
}: Props) {
  React.useEffect(() => {
    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movieInfo.media_type === 'tv' ? 'tv' : 'movie'
        }/${
          movieInfo.id
        }?api_key=${api}&language=en-US&append_to_response=videos`
      ).then((response) => response.json());
      // if the response has videos filter out the trailer video
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: any) => element.type === 'Trailer'
        );
        setTrailer(data.videos?.results[index]?.key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
    }

    fetchMovie();
  }, []);
}
