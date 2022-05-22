import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const { user, username } = {
    user: { photoURL: 'https://logos-download.com/wp-content/uploads/2018/03/Batman_logo_bat.png' },
    username: 'jake'
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn-logo">FEED</button>
          </Link>
        </li>

        {username && (
          <>
            <li className="push-left">
              <Link href="/admin">
                <button className="btn-blue">Write Posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <Image
                  src={user?.photoURL}
                  width="50px"
                  height="50px"
                  alt="user profile picture"
                ></Image>
              </Link>
            </li>
          </>
        )}

        {!username && (
          <li>
            <Link href="/enter">
              <button className="btn-blue">Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
