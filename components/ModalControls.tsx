import { MovieInfo, RowData } from '../typings';
import { useSession } from 'next-auth/react';
import handleAddMovieToMyList from '../util/handleAddMovieToMyList';
import handleRemoveMovieFromMyList from '../util/handleRemoveMovieFromMyList';
import handleLikeMovie from '../util/handleLikeMovie';
import handleUnlikeMovie from '../util/handleUnlikeMovie';
import React from 'react';

interface Props {
  muted: boolean;
  rowIndex: number | null;
  movieInfo: MovieInfo;
  myListData: RowData;
  myLikedData: RowData;
  setMuted: React.Dispatch<React.SetStateAction<boolean>>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setMovieRef: React.Dispatch<React.SetStateAction<number | null>>;
  setHeaderBlack: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalControls({
  muted,
  rowIndex,
  movieInfo,
  myListData,
  myLikedData,
  setMuted,
  setModal,
  setMovieRef,
  setHeaderBlack,
}: Props) {
  const [showLikedPopUp, setShowLikedPopUp] = React.useState(false);
  const [showSavedMoviePopUp, setShowSavedMoviePopUp] = React.useState(false);

  const movieSaved = myListData.results
    .map((info) => info.original_title || info.name)
    .includes(movieInfo.original_title || movieInfo.name);

  const movieLiked = myLikedData.results
    .map((info) => info.original_title || info.name)
    .includes(movieInfo.original_title || movieInfo.name);

  const { data: session } = useSession();

  return (
    <div className="absolute bottom-[-2px] left-0 px-5 sm:bg-gradient-to-t from-[#141414] bg-[#141414] sm:bg-[#0000] pt-2 sm:pt-5 z-[3000] flex justify-between items-center w-[calc(100%+2px)] pb-5">
      <div className="flex items-center justify-start gap-4">
        <div className="bg-white flex items-center justify-center px-3 sm:px-6 py-1 rounded-[4px]">
          <svg
            className="sm:h-8 sm:w-8 h-5 w-5"
            fill="black"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
            />
          </svg>
          <p className="text-black sm:text-base text-sm pr-2">Play</p>
        </div>
        <div
          className="relative"
          onMouseEnter={() => setShowSavedMoviePopUp(true)}
          onMouseLeave={() => setShowSavedMoviePopUp(false)}
        >
          {showSavedMoviePopUp ? (
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-0">
              <div className="bg-white text-black w-max py-2 px-6 text-xl font-semibold rounded-md relative z-10">
                {movieSaved ? (
                  <p>Remove from My List</p>
                ) : (
                  <p>Add to My List</p>
                )}
              </div>
              <div className="h-6 w-6 bg-white rotate-45 absolute z-0 -bottom-2 left-1/2 transform -translate-x-1/2"></div>
            </div>
          ) : (
            ''
          )}
          {movieSaved ? (
            <button
              className="border-solid border-[2px] border-[#585858] hover:border-white rounded-full p-2"
              onClick={() => {
                handleRemoveMovieFromMyList({
                  session,
                  movieName: movieInfo.original_title || movieInfo.name,
                });
                if (rowIndex === 12) {
                  setModal(false);
                  setMovieRef(null);
                  setHeaderBlack(true);
                  document.body.style.overflow = 'initial';
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="sm:w-6 sm:h-6 h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </button>
          ) : (
            <button
              className="border-solid border-[2px] border-[#585858] hover:border-white rounded-full p-2"
              onClick={() =>
                handleAddMovieToMyList({
                  session,
                  movieName: movieInfo.original_title || movieInfo.name,
                })
              }
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="sm:w-6 sm:h-6 h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          )}
        </div>
        <button
          className="border-solid border-[2px] border-[#585858] hover:border-white rounded-full p-2 relative z-20"
          onMouseEnter={() => setShowLikedPopUp(true)}
          onMouseLeave={() => setShowLikedPopUp(false)}
          onClick={() => {
            movieLiked
              ? handleUnlikeMovie({
                  session,
                  movieName: movieInfo.original_title || movieInfo.name,
                })
              : handleLikeMovie({
                  session,
                  movieName: movieInfo.original_title || movieInfo.name,
                });
          }}
        >
          <svg
            fill={movieLiked ? 'white' : 'none'}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="sm:w-6 sm:h-6 h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
            />
          </svg>
          {showLikedPopUp ? (
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-0">
              <div className="bg-white text-black w-max py-2 px-6 text-xl font-semibold rounded-md relative z-10">
                {movieLiked ? <p>Remove your like</p> : <p>I like this</p>}
              </div>
              <div className="h-6 w-6 bg-white rotate-45 absolute z-0 -bottom-2 left-1/2 transform -translate-x-1/2"></div>
            </div>
          ) : (
            ''
          )}
        </button>
      </div>
      <button
        className="border-solid border-[2px] border-[#585858] hover:border-white rounded-full p-2"
        onClick={() => setMuted(!muted)}
      >
        {muted ? (
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="sm:w-6 sm:h-6 h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"
            />
          </svg>
        ) : (
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="sm:w-6 sm:h-6 h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
