/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ReactPlayer from 'react-player';
import useFetchMovieTrailer from '../hooks/useFetchMovieTrailer';
import { MovieInfo, RowData } from '../typings';
import ModalControls from './ModalControls';

interface Props {
  movieInfo: MovieInfo;
  myListData: RowData;
  myLikedData: RowData;
  rowIndex: number | null;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setMovieRef: React.Dispatch<React.SetStateAction<number | null>>;
  setHeaderBlack: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal({
  movieInfo,
  myListData,
  myLikedData,
  rowIndex,
  setModal,
  setMovieRef,
  setHeaderBlack,
}: Props) {
  const [trailer, setTrailer] = React.useState<null | number>(null);
  const [genres, setGenres] = React.useState<any[]>([]);
  const [muted, setMuted] = React.useState(false);
  const [noMovie, setNoMovie] = React.useState(false);

  useFetchMovieTrailer({ movieInfo, setTrailer, setGenres, setNoMovie });

  return (
    <div className="fixed z-[1000] w-[90vw] sm:w-[80vw] xl:w-[50vw]  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-md shadow-[0px_0px_15px_5px_rgba(0,0,0,0.4)] bg-[#141414] ">
      <button
        className="absolute right-5 hover:scale-110 top-4 z-[1001] h-12 w-12 bg-[#141414] rounded-full"
        onClick={() => {
          setModal(false);
          setMovieRef(null);
          setHeaderBlack(true);
          document.body.style.overflow = 'initial';
        }}
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="relative h-[70vw] sm:h-[50vw] xl:h-[29vw]">
        {noMovie ? (
          <div className="h-full w-full flex items-center justify-center text-center">
            <p>
              Sorry this trailer is currently unavailable, please try another
              movie.
            </p>
          </div>
        ) : (
          ''
        )}
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${trailer}`}
          width="100%"
          height="100%"
          // style={{ position: 'absolute', zIndex: '1005' }}
          playing
          muted={muted}
          loop
        />
        <ModalControls
          muted={muted}
          myListData={myListData}
          myLikedData={myLikedData}
          setMuted={setMuted}
          movieInfo={movieInfo}
          rowIndex={rowIndex}
          setModal={setModal}
          setMovieRef={setMovieRef}
          setHeaderBlack={setHeaderBlack}
        />
      </div>
      <div className="px-5 pb-5 sm:p-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-2xl pb-1 font-semibold">
            {movieInfo?.name ||
              movieInfo?.original_title ||
              movieInfo?.origional_name ||
              movieInfo?.title}
          </p>
          <div className="flex justify-start items-center gap-3 pb-3">
            <p className="text-green-400">
              {(movieInfo?.vote_average * 10).toFixed()}% Match
            </p>
            <p>{movieInfo.release_date}</p>
          </div>
          <div className="flex gap-2">
            <p className="max-h-[100px] text-sm sm:text-base overflow-y-auto scrollbar">
              {movieInfo.overview}
            </p>
            <div className="hidden text-sm sm:flex items-center justify-between gap-2">
              <div className="shrink-0">
                <div className="flex w-[150px] flex-wrap">
                  <p className="pr-2">Genres:</p>
                  {genres.map((genre, index) => (
                    <p key={index} className="pr-2 text-white">
                      <b>
                        {genre.name}
                        {`${index < genres.length - 1 ? ',' : ''}`}
                      </b>
                    </p>
                  ))}
                </div>
                <p className="pt-2">
                  Origional Language: <b>{movieInfo.original_language}</b>
                </p>
                <p className="pt-2">
                  Total votes: <b>{movieInfo.vote_count}</b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
