import { collectionGroup, getDocs } from 'firebase/firestore';
import { db, getPost, getPostPath, getUserWithUsername } from '../../lib/firebase';

export type GetStaticPropsProps = {
  params: Record<string, string>;
};
export const getStaticProps = async ({ params }: GetStaticPropsProps) => {
  const { username, slug } = params;
  const user = await getUserWithUsername(username);

  let post, path;

  if (user) {
    path = getPostPath(user, slug);
    post = await getPost(path);
  }

  return {
    props: { post, path },
    revalidate: 5000
  };
};

export async function getStaticPaths() {
  // Improve my using Admin SDK to select empty docs
  const snapshot = await getDocs(collectionGroup(db, 'posts'));

  const paths = snapshot.docs.map(doc => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug }
    };
  });

  return {
    // must be in this format:
    // paths: [
    //   { params: { username, slug }}
    // ],
    paths,
    fallback: 'blocking'
  };
}

const PostPage = () => {
  return (
    <main>
      <h1>Your post</h1>
    </main>
  );
};

export default PostPage;
