import { Timestamp } from 'firebase/firestore';
import Link from 'next/link';

interface Post {
  content: string;
  heartCount: number;
  published: boolean;
  slug: string;
  title: string;
  uid: string;
  username: string;
}

export interface PostFirestore extends Post {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface PostJSON extends Post {
  createdAt: number;
  updatedAt: number;
}

export interface PostItemProps {
  post: PostJSON;
  admin?: boolean;
}

export interface PostFeedProps {
  admin?: boolean;
  posts: PostJSON[];
}

const PostItem = ({ post, admin = false }: PostItemProps) => {
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = Math.floor(wordCount / 100 + 1);
  if (admin) console.log({ admin });

  return (
    <div className="card">
      <Link href={`/${post.username}`}>
        <a>
          <strong>By @{post.username}</strong>
        </a>
      </Link>

      <Link href={`/${post.username}/${post.slug}`}>
        <h2>
          <a>{post.title}</a>
        </h2>
      </Link>
      <footer>
        <span>
          {wordCount} words, {minutesToRead} minutes to read
        </span>
        <span>💜 {post.heartCount} likes</span>
      </footer>
    </div>
  );
};

const PostFeed = ({ posts, admin }: PostFeedProps) => {
  return <>{posts && posts.map(post => <PostItem post={post} key={post.slug} admin={admin} />)}</>;
};

export default PostFeed;
