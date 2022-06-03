import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBx3t5FXZVT8y7cubs88-2Ebi1zoD4Pnms',
  authDomain: 'netflix-clone-model.firebaseapp.com',
  projectId: 'netflix-clone-model',
  storageBucket: 'netflix-clone-model.appspot.com',
  messagingSenderId: '61158879390',
  appId: '1:61158879390:web:0ecfdfc1ca2f2e7b6c4b8f',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
