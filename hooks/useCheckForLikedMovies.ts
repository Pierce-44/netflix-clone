/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React from 'react';
import { Session } from 'next-auth';
import { RowData } from '../typings';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { app } from '../util/firebase';

interface Props {
  data: RowData[];
  session: Session | null;
  myListData: RowData;
  setMyLikedData: React.Dispatch<React.SetStateAction<RowData>>;
}

export default function useCheckForLikedMovies({
  data,
  session,
  myListData,
  setMyLikedData,
}: Props) {
  const db = getFirestore(app);

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    if (!session || mounted) return;

    const unsub = onSnapshot(
      doc(db, 'users', session!.user!.email as string),
      (docs: any) => {
        if (docs.exists()) {
          const array = [...myListData.results];
          const movieNames: string[] = [];

          // map over the api data to get the individual movies info
          data.map((data) => {
            data.results.map((movieInfo) => {
              if (
                // check if the users liked list includes a movie from the api, if so push it into the array
                docs
                  .data()
                  .likedList.includes(
                    movieInfo.original_title || movieInfo.name
                  ) &&
                !movieNames.includes(movieInfo.original_title || movieInfo.name)
              ) {
                array.push(movieInfo);
                movieNames.push(movieInfo.original_title || movieInfo.name);
              }
            });
          });
          setMyLikedData({ results: array });
          setMounted(true);
        }
      }
    );

    return () => {
      unsub;
      setMounted(false);
    };
  }, [session, data]);
}
