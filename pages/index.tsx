import type { NextPage } from 'next';
import Link from 'next/link';
import { Loader } from '../components/Loader';

const Home: NextPage = () => {
  return (
    <div>
      <Link
        prefetch={true}
        href={{
          pathname: '/[username]',
          query: { username: 'mario' }
        }}
      >
        <a>Mario&apos;s profile</a>
      </Link>

      <Loader show />
    </div>
  );
};

export default Home;
