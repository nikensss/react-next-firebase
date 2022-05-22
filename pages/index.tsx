import type { NextPage } from 'next';
import Link from 'next/link';

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
    </div>
  );
};

export default Home;
