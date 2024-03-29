import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { PostFirestore, PostJSON } from './PostFeed';

export const PostContent = ({ post }: { post?: PostJSON | PostFirestore }) => {
  const createdAt = typeof post?.createdAt === 'number' ? new Date(post.createdAt) : post?.createdAt.toDate();

  return (
    <div className="card">
      <h1>{post?.title}</h1>
      <span className="text-sm">
        Written by{' '}
        <Link href={`/${post?.username}/`}>
          <a className="text-info">@{post?.username}</a>
        </Link>{' '}
        on {createdAt?.toISOString()}
      </span>
      <ReactMarkdown>{post?.content || ''}</ReactMarkdown>
    </div>
  );
};
