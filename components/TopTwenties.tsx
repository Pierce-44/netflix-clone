import Image from 'next/image';
import { MovieInfo } from '../typings';

interface Props {
  movieInfo: MovieInfo;
  index: number;
}

export default function TopTwenties({ movieInfo, index }: Props) {
  return (
    <div className="h-full">
      <div className="absolute left-0 top-0 h-full w-1/2">
        <Image
          src={`/numbers/number${index + 1}.png`}
          alt="movie"
          className="object-cover"
          layout="fill"
          draggable="false"
          priority
        />
      </div>
      <div className="absolute top-0 right-4 h-full w-1/2">
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
      </div>
    </div>
  );
}
