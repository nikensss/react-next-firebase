import {
  collectionGroup,
  getDocs,
  limit,
  orderBy,
  Query,
  query,
  startAfter,
  Timestamp,
  where
} from 'firebase/firestore';
import { useState } from 'react';
import { Loader } from '../components/Loader';
import PostFeed, { PostFirestore } from '../components/PostFeed';
import { db, postToJSON } from '../lib/firebase';

const LIMIT = 2;

export const getServerSideProps = async () => {
  const postsQuery = query(
    collectionGroup(db, 'posts') as Query<PostFirestore>,
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(LIMIT)
  );

  const posts = (await getDocs(postsQuery)).docs.map(postToJSON);

  return { props: { posts } };
};

const Home = ({ posts: _posts }: Awaited<ReturnType<typeof getServerSideProps>>['props']) => {
  const [posts, setPosts] = useState(_posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);
    try {
      const last = posts[posts.length - 1];
      const cursor = Timestamp.fromMillis(last.createdAt);

      const postsQuery = query(
        collectionGroup(db, 'posts') as Query<PostFirestore>,
        where('published', '==', true),
        orderBy('createdAt', 'desc'),
        startAfter(cursor),
        limit(LIMIT)
      );

      const newPosts = (await getDocs(postsQuery)).docs.map(postToJSON);

      setPosts(posts => [...posts, ...newPosts]);

      if (newPosts.length < LIMIT) setPostsEnd(true);
    } catch (ex) {
      console.error(ex);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main>
      <PostFeed posts={posts}></PostFeed>

      {!loading && !postsEnd && <button onClick={getMorePosts}>Load more</button>}

      <Loader show={loading} />

      {postsEnd && 'No more posts!'}
    </main>
  );
};

export default Home;
