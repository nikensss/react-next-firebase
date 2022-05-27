import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';
import { UserContext } from '../lib/context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContext.Provider
      value={{
        user: {
          photoURL: 'https://logos-download.com/wp-content/uploads/2018/03/Batman_logo_bat.png'
        },
        username: 'aa'
      }}
    >
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp;
