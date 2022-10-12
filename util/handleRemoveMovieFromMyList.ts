/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Session } from 'next-auth';
import { doc, updateDoc, arrayRemove, getFirestore } from 'firebase/firestore';
import { app } from './firebase';

interface Props {
  movieName: string;
  session: Session | null;
}

export default async function handleRemoveMovieFromMyList({
  session,
  movieName,
}: Props) {
  const db = getFirestore(app);
  const userRef = doc(db, 'users', session!.user!.id);

  await updateDoc(userRef, {
    myList: arrayRemove(movieName),
  });
}
