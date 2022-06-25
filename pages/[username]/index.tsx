import PostFeed, { PostJSON } from '../../components/PostFeed';
import { User, UserProfile } from '../../components/UserProfile';
import { getUserPosts, getUserWithUsername } from '../../lib/firebase';

export interface GetServerSidePropsProps {
  query: { username: string };
}

export const getServerSideProps = async ({ query: { username } }: GetServerSidePropsProps) => {
  const userDoc = await getUserWithUsername(username);

  if (!userDoc) return { props: { user: null, posts: null } };

  const user = userDoc.data();
  const posts = await getUserPosts(userDoc);

  return { props: { user, posts } };
};

export interface UserProfilePageProps {
  user: User;
  posts: PostJSON[];
}

const UserProfilePage = ({ user, posts }: UserProfilePageProps) => {
  return (
    <main>
      <UserProfile user={user} />
      <PostFeed posts={posts} admin={false} />
    </main>
  );
};

export default UserProfilePage;
