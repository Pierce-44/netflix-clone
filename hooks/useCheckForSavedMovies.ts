/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React from 'react';
import { Session } from 'next-auth';
import { MovieInfo, RowData } from '../typings';
import { doc, getFirestore, setDoc, onSnapshot } from 'firebase/firestore';
import { app } from '../util/firebase';

interface Props {
  data: RowData[];
  session: Session | null;
  myListData: RowData;
  setMyListData: React.Dispatch<React.SetStateAction<RowData>>;
}

export default function useCheckForSavedMovies({
  data,
  session,
  myListData,
  setMyListData,
}: Props) {
  const db = getFirestore(app);

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    if (!session || mounted) return;

    const unsub = onSnapshot(
      doc(db, 'users', session!.user!.email as string),
      (docs: any) => {
        if (docs.exists()) {
          const array: MovieInfo[] = [];
          const movieNames: string[] = [];

          // map over the api data to get the individual movies info
          data.map((data) => {
            data.results.map((movieInfo) => {
              if (
                // check if the users db my list includes a movie from the api, if so push it into the array
                docs
                  .data()
                  .myList.includes(
                    movieInfo.original_title || movieInfo.name
                  ) &&
                !movieNames.includes(movieInfo.original_title || movieInfo.name)
              ) {
                array.push(movieInfo);
                movieNames.push(movieInfo.original_title || movieInfo.name);
              }
            });
          });
          setMyListData({ results: array });
          setMounted(true);
        } else {
          // If the user doesnt exist add a new document in collection "users"
          setDoc(doc(db, 'users', session!.user!.email as string), {
            myList: [],
            likedList: [],
          });
        }
      }
    );

    return () => {
      unsub;
      setMounted(false);
    };
  }, [session, data]);
}
