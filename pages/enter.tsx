import { signInWithPopup } from 'firebase/auth';
import { auth, googleAuth } from '../lib/firebase';
import Image from 'next/image';
import { useContext } from 'react';
import { UserContext } from '../lib/context';

const EnterPage = () => {
  const { user, username } = useContext(UserContext);

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return <main>{!user ? <SignInButton /> : username ? <SignOutButton /> : <UsernameForm />}</main>;
};

export default EnterPage;

const SignInButton = () => {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuth);
  };

  return (
    <button className="btn-google" onClick={signInWithGoogle} style={{ height: '70px' }}>
      <Image src={'/google.png'} width="30px" height="30px" alt="Google logo" /> Sign in with Google
    </button>
  );
};

const SignOutButton = () => {
  return <button onClick={() => auth.signOut()}>Sign out</button>;
};

const UsernameForm = () => {
  return <button>Under construction...</button>;
};
