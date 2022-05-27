import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export const useUserData = () => {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    if (!user) return setUsername(null);

    return onSnapshot(doc(db, 'users', user.uid), doc => {
      setUsername(doc.data()?.username);
    });
  }, [user]);

  return { user, username };
};
