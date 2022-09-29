import Image from 'next/image';
import { RowData } from '../typings';
import { sectionsNameArray } from '../util/fetchMovieData';

interface Props {
  rowData: RowData;
  index: number;
}

export default function Row({ rowData, index }: Props) {
  // console.log(rowData);
  return (
    <div className="mt-12">
      <p className="ml-[5vw] text-lg pb-2 font-semibold">
        {sectionsNameArray[index]}
      </p>
      <div className="flex gap-[0.4vw] justify-start items-center ml-[5vw]">
        {rowData.results.map((movieInfo, index) => (
          <div
            key={index}
            className="relative h-[26vw] w-[44vw] sm:h-[12.5vw] sm:w-[22vw] lg:h-[10.5vw] lg:w-[17.5vw] shrink-0"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${
                movieInfo.backdrop_path || movieInfo.poster_path
              }`}
              alt="movie"
              className="object-cover rounded-sm"
              layout="fill"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
