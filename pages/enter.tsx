import { signInWithPopup } from 'firebase/auth';
import { auth, db, googleAuth } from '../lib/firebase';
import Image from 'next/image';
import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../lib/context';
import { doc, getDoc, writeBatch } from 'firebase/firestore';
import debounce from 'lodash.debounce';

const EnterPage = () => {
  const { user, username } = useContext(UserContext);

  // 1. user signed out -> <SignInButton />
  // 2. user signed in, but missing username -> <UsernameForm />
  // 3. user signed in, has username -> <SignOutButton />
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
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const debouncedCheck = debounce(async (username: string): Promise<void> => {
    if (username.length < 3) return;

    const ref = doc(db, `usernames/${username}`);
    const snapshot = await getDoc(ref);
    console.log('Firestore read executed!');
    setIsValid(!snapshot.exists());
    setLoading(false);
  }, 500);

  const checkUsername = useCallback((username: string) => {
    debouncedCheck(username)?.catch(console.error);
  }, []);

  useEffect(() => checkUsername(formValue), [formValue]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const userDoc = doc(db, `users/${user?.uid}`);
      const usernameDoc = doc(db, `usernames/${formValue}`);

      const batch = writeBatch(db);
      batch.set(userDoc, {
        username: formValue,
        photoURL: user?.photoURL,
        displayName: user?.displayName
      });
      batch.set(usernameDoc, { uid: user?.uid });

      await batch.commit();
    } catch (ex) {
      console.error(ex);
    }
  };

  return username ? (
    <></>
  ) : (
    <section>
      <h3>Choose username</h3>

      <form action="" onSubmit={onSubmit}>
        <input
          type=""
          name="username"
          placeholder="username"
          value={formValue}
          onChange={onChange}
        />

        <UsernameMessage username={formValue} isValid={isValid} loading={loading} />

        <button type="submit" className="btn-green" disabled={!isValid}>
          Choose
        </button>

        <h3>Debug state</h3>
        <div>
          Username: {formValue}
          <br />
          Loading: {loading.toString()}
          <br />
          Username Valid: {isValid.toString()}
        </div>
      </form>
    </section>
  );
};

type FormState = {
  username: string;
  isValid: boolean;
  loading: boolean;
};

const UsernameMessage = ({ username, isValid, loading }: FormState) => {
  if (loading) return <p>Checking...</p>;

  if (isValid) return <p className="text-success">{username} is available!</p>;

  if (username && !isValid) return <p className="text-danger">That username is taken!</p>;

  return <p></p>;
};
