import { createContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export const UserContext = createContext<{
  user: ReturnType<typeof useAuthState>[0];
  username: null | string;
}>({
  user: null,
  username: null
});
