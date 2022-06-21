import Image from 'next/image';

export interface User {
  displayName: string;
  photoURL: string;
  username: string;
}
export interface UserProfileProps {
  user: User;
}

export const UserProfile = ({ user }: UserProfileProps) => {
  if (!user) return null;

  return (
    <div className="box-center">
      <div className="card-img-center">
        <Image
          className="card-img-center"
          src={user.photoURL}
          alt="Profile picture"
          layout="intrinsic"
          width={150}
          height={150}
        />
      </div>
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName}</h1>
    </div>
  );
};
