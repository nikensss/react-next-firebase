import { createContext } from 'react';

export const UserContext = createContext<{ user: null | string; username: null | string }>({
  user: null,
  username: null
});
