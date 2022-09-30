import React from 'react';
import ReactPlayer from 'react-player';
import useFetchMovieTrailer from '../hooks/useFetchMovieTrailer';
import { MovieInfo } from '../typings';

interface Props {
  movieInfo: MovieInfo;
}

export default function Modal({ movieInfo }: Props) {
  const [trailer, setTrailer] = React.useState<null | number>(null);

  useFetchMovieTrailer({ movieInfo, setTrailer });

  return (
    <div className="fixed top-[75px] w-[50vw]  left-1/4 z-[1000] overflow-hidden rounded-md">
      {trailer ? (
        <div className="relative h-[29vw]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            // style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            // muted={true}
          />
        </div>
      ) : (
        <div className="h-[29vw] w-full bg-red-700"></div>
      )}
      <div className="bg-[#141414]">
        <p>
          {movieInfo.name ||
            movieInfo.original_title ||
            movieInfo.origional_name ||
            movieInfo.title}
        </p>
        <p>{(movieInfo.vote_average * 10).toFixed()}%</p>
      </div>
    </div>
  );
}
