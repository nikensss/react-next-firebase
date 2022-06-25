import { getApp, initializeApp } from 'firebase/app';
// these imports indicate 'next' to bundle them
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  where
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { PostFirestore, PostJSON } from '../components/PostFeed';
import { User } from '../components/UserProfile';

export const app = (() => {
  // in the development phase, this code might be executed twice, but only one
  // app can be initialized with firebase
  try {
    return getApp();
  } catch (ex) {
    return initializeApp({
      apiKey: 'AIzaSyBMfmPWGDK_hugr1gw7IC7749ywuBQ4U8A',
      authDomain: 'nextfire-a6a96.firebaseapp.com',
      projectId: 'nextfire-a6a96',
      storageBucket: 'nextfire-a6a96.appspot.com',
      messagingSenderId: '710532354375',
      appId: '1:710532354375:web:f65f95fe9cacbd7cf23c62'
    });
  }
})();

export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();

export const db = getFirestore(app);

export const storage = getStorage(app);

export const getUserWithUsername = async (
  username: string
): Promise<QueryDocumentSnapshot<User>> => {
  const userQuery = query(collection(db, 'users'), where('username', '==', username), limit(1));
  return (await getDocs(userQuery)).docs[0] as QueryDocumentSnapshot<User>;
};

export const getUserPosts = async (userDoc: QueryDocumentSnapshot<User>): Promise<PostJSON[]> => {
  const postsQuery = query(
    collection(db, 'users', userDoc.id, 'posts'),
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(5)
  );

  return ((await getDocs(postsQuery)).docs as QueryDocumentSnapshot<PostFirestore>[]).map(
    postToJSON
  );
};

export const postToJSON = (doc: QueryDocumentSnapshot<PostFirestore>): PostJSON => {
  const data = doc.data();
  if (!data) throw new Error('No data available');

  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis()
  };
};
