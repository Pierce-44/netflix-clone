import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';
import React from 'react';
import useWindowWidth from '../hooks/useWindowWidth';
import { RowData } from '../typings';
import { sectionsNameArray } from '../util/fetchMovieData';
import handleCarousel from '../util/handleCarousel';
import Modal from './Modal';
import TopTwenties from './TopTwenties';

interface Props {
  rowData: RowData;
  rowIndex: number;
  myListData: RowData;
  myLikedData: RowData;
  setHeaderBlack: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Row({
  rowData,
  rowIndex,
  myListData,
  myLikedData,
  setHeaderBlack,
}: Props) {
  const [showNavTabs, setShowNavTabs] = React.useState(false);
  const [showLeftNavTab, setShowLeftNavTab] = React.useState(false);
  const [showRightNavTab, setShowRightNavTab] = React.useState(true);
  const [factorLimit, setFactorLimit] = React.useState<number | null>(null);
  const [factor, setFactor] = React.useState(0);
  const [movieRef, setMovieRef] = React.useState<null | number>(null);
  const [modal, setModal] = React.useState(false);

  const widthRef = React.useRef<HTMLDivElement>(null);

  useWindowWidth({
    setFactor,
    setFactorLimit,
    setShowLeftNavTab,
    setShowRightNavTab,
  });

  const handlers = useSwipeable({
    onSwipedRight: () =>
      handleCarousel({
        factor,
        factorLimit,
        right: false,
        left: true,
        setFactor,
        setShowLeftNavTab,
        setShowRightNavTab,
      }),
    onSwipedLeft: () =>
      handleCarousel({
        factor,
        factorLimit,
        right: true,
        left: false,
        setFactor,
        setShowLeftNavTab,
        setShowRightNavTab,
      }),
    swipeDuration: Infinity,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div
      {...handlers}
      className="mt-12 mx-[5vw]"
      ref={widthRef}
      onMouseEnter={() => setShowNavTabs(true)}
      onMouseLeave={() => setShowNavTabs(false)}
    >
      {modal && movieRef !== null ? (
        <Modal
          movieInfo={rowData.results[movieRef]}
          myListData={myListData}
          myLikedData={myLikedData}
          rowIndex={rowIndex}
          setModal={setModal}
          setMovieRef={setMovieRef}
          setHeaderBlack={setHeaderBlack}
        />
      ) : (
        ''
      )}
      <p className="text-lg pb-2 font-semibold">
        {sectionsNameArray[rowIndex]}
      </p>
      <div
        {...handlers}
        className="flex relative justify-start items-center w-full 
        "
      >
        <button
          className={`${
            showLeftNavTab && showNavTabs ? '' : 'hidden'
          } absolute h-full group rounded-sm w-[calc(5vw-4.8px)] bg-[#00000080] top-0 -left-[5vw] flex items-center justify-center z-40`}
          onClick={() =>
            handleCarousel({
              factor,
              factorLimit,
              right: false,
              left: true,
              setFactor,
              setShowLeftNavTab,
              setShowRightNavTab,
            })
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="w-12 h-12 group-hover:scale-125 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        {rowData.results.map((movieInfo, index) => (
          <div
            key={index}
            className={` h-[26vw] w-1/2 sm:h-[12.5vw] sm:w-1/4 lg:h-[10.5vw] 
            lg:w-1/5 shrink-0 transition-all duration-700 ease-[cubic-bezier(.5,0,.1,1)]`}
            style={{
              translate: `calc(${widthRef.current?.offsetWidth} * ${factor}px)`,
            }}
          >
            <div className="mx-[5px] h-full relative ">
              <button
                className="w-full h-full relative hover:scale-105 transition-all duration-200"
                onClick={() => {
                  setModal(true);
                  setMovieRef(index);
                  setHeaderBlack(false);
                  document.body.style.overflow = 'hidden';
                }}
              >
                {rowIndex === 0 ? (
                  <TopTwenties movieInfo={movieInfo} index={index} />
                ) : (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${
                      movieInfo.backdrop_path || movieInfo.poster_path
                    }`}
                    alt="movie"
                    className="object-cover rounded-sm "
                    layout="fill"
                    draggable="false"
                    priority
                  />
                )}
              </button>
            </div>
          </div>
        ))}
        <button
          className={`${
            showNavTabs && showRightNavTab ? '' : 'hidden'
          } absolute h-full rounded-sm w-[calc(5vw-4.7px)] group bg-[#00000080] top-0 right-[-5vw] flex items-center justify-center`}
          onClick={() => {
            setShowLeftNavTab(true);
            handleCarousel({
              factor,
              factorLimit,
              right: true,
              left: false,
              setFactor,
              setShowLeftNavTab,
              setShowRightNavTab,
            });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className="w-12 h-12 group-hover:scale-125 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
