/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Session } from 'next-auth';
import { RowData } from '../typings';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
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
  async function handleCheckUser() {
    const db = getFirestore(app);
    const docRef = doc(db, 'users', session!.user!.id);
    const docSnap = await getDoc(docRef);

    // console.log(session.user.id);

    if (docSnap.exists()) {
      // console.log(docSnap.data().myList);

      const array = [...myListData.results];

      data.map((data) => {
        data.results.map((movieInfo) =>
          // console.log(movieInfo.original_title || movieInfo.name)
          {
            if (
              // check if the api list includes a saved movie from the db if so push it into the array
              docSnap
                .data()
                .myList.includes(movieInfo.original_title || movieInfo.name)
            ) {
              console.log('saved');
              // const array = [...myListData.results];
              array.push(movieInfo);
              // console.log(array);
            }
          }
        );
      });
      setMyListData({ results: array });
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');

      // If the user doesnt exist add a new document in collection "users"
      await setDoc(doc(db, 'users', session!.user!.id), {
        myList: [],
      });
    }
  }

  React.useEffect(() => {
    if (!session) return;
    handleCheckUser();
  }, [session]);
}
