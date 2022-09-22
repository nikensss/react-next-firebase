import Head from 'next/head';

type MetaTagsProps = Partial<{
  title: string;
  description: string;
  image: string;
}>;

export const MetaTags = ({ title, description, image }: MetaTagsProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:card" content="" />
      <meta name="twitter:site" content="" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
};
