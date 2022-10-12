import Image from 'next/image';
import React from 'react';
import { MovieInfo, RowData } from '../typings';
import Modal from './Modal';

interface Props {
  movieInfo: MovieInfo;
  myListData: RowData;
  myLikedData: RowData;
  setHeaderBlack: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Banner({
  movieInfo,
  myListData,
  myLikedData,
  setHeaderBlack,
}: Props) {
  const [, setMovieRef] = React.useState<null | number>(null);
  const [modal, setModal] = React.useState(false);

  return (
    <div className="h-[54vw] realtive">
      {modal ? (
        <Modal
          myListData={myListData}
          myLikedData={myLikedData}
          rowIndex={null}
          movieInfo={movieInfo}
          setModal={setModal}
          setMovieRef={setMovieRef}
          setHeaderBlack={setHeaderBlack}
        />
      ) : (
        ''
      )}
      <div className="pl-[5vw] absolute top-0 left-0 flex-col h-[54vw] w-full z-30 flex items-start justify-center">
        <p className="textShadow text-xl sm:text-3xl md:text-5xl pb-6 font-semibold">
          {movieInfo.title || movieInfo.name || movieInfo.origional_name}
        </p>
        <p className="textShadow hidden sm:flex md:text-base text-sm max-w-[600px]">
          {movieInfo.overview}
        </p>
        <div className="sm:mt-7 flex items-center justify-center gap-3 lg:mb-20">
          <button
            className="hover:bg-[#dfdfdf] flex items-center justify-center gap-1 sm:gap-2 bg-white py-1 sm:py-2 rounded-[4px] px-2 sm:px-7"
            onClick={() => {
              setModal(true);
              setHeaderBlack(false);
              document.body.style.overflow = 'hidden';
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="black"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="black"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
              />
            </svg>
            <p className="text-black font-semibold text-xs sm:text-xl">Play</p>
          </button>
          <button
            className="bg-[#6D6D6EB3] hover:bg-[#6d6d6ed8] flex items-center gap-2 justify-center h-full rounded-[4px] px-5"
            onClick={() => {
              setModal(true);
              setHeaderBlack(false);
              document.body.style.overflow = 'hidden';
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
            <p className="font-semibold sm:text-xl text-xs">More Info</p>
          </button>
        </div>
      </div>
      <div className="absolute top-[19vw]  left-0 h-[35vw] w-full to-transparent from-[#141414] z-10 bg-gradient-to-t"></div>
      <div className="relative h-full w-full">
        <Image
          src={`https://image.tmdb.org/t/p/original${
            movieInfo.backdrop_path || movieInfo.poster_path
          }`}
          alt="movie"
          className="object-cover"
          layout="fill"
          priority
        />
      </div>
    </div>
  );
}
