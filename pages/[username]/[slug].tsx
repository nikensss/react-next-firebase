import { collectionGroup, doc, DocumentReference, getDocs } from 'firebase/firestore';
import { db, getPost, getPostPath, getUserWithUsername } from '../../lib/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { PostContent } from '../../components/PostContent';
import { PostFirestore } from '../../components/PostFeed';

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

const PostPage = ({ post, path }: Awaited<ReturnType<typeof getStaticProps>>['props']) => {
  const postRef = doc(db, path || '') as DocumentReference<PostFirestore>;
  const [realtimePost] = useDocumentData<PostFirestore>(postRef);

  return (
    <main>
      <section>
        <PostContent post={realtimePost || post} />
      </section>

      <aside className="card">
        <p>
          <strong>{post?.heartCount || 0} ❤️</strong>
        </p>
      </aside>
    </main>
  );
};

export default PostPage;
