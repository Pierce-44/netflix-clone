import Image from 'next/image';
import React from 'react';
import useRandomNumber from '../hooks/useRandomNumber';
import { MovieInfo } from '../typings';

interface Props {
  bannerInfo: MovieInfo[];
}

export default function Banner({ bannerInfo }: Props) {
  const selectedMovie = useRandomNumber();

  // console.log(bannerInfo[selectedMovie]);

  return (
    <div className="h-[54vw] realtive">
      <div className="absolute top-[19vw]  left-0 h-[35vw] w-full to-transparent from-[#141414] z-10 bg-gradient-to-t"></div>
      {selectedMovie ? (
        <div className="relative h-full w-full">
          <Image
            src={`https://image.tmdb.org/t/p/original${
              bannerInfo[selectedMovie].backdrop_path ||
              bannerInfo[selectedMovie].poster_path
            }`}
            alt="movie"
            className="object-cover"
            layout="fill"
            priority
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
