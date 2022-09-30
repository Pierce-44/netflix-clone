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
      {selectedMovie ? (
        <>
          {' '}
          <div className="pl-[5vw] absolute top-0 left-0 flex-col h-[54vw] w-full z-30 flex items-start justify-center">
            <p className="textShadow text-xl sm:text-3xl md:text-5xl pb-6 font-semibold">
              {bannerInfo[selectedMovie].title ||
                bannerInfo[selectedMovie].name ||
                bannerInfo[selectedMovie].origional_name}
            </p>
            <p className="textShadow hidden sm:flex md:text-base text-sm max-w-[500px]">
              {bannerInfo[selectedMovie].overview}
            </p>
          </div>
          <div className="absolute top-[19vw]  left-0 h-[35vw] w-full to-transparent from-[#141414] z-10 bg-gradient-to-t"></div>
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
        </>
      ) : (
        ''
      )}
    </div>
  );
}
