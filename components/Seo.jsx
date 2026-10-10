// components/SEO.js
import Head from "next/head";

const SEO = ({ title, description, url}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
     
    </Head>
  );
};

export default SEO;
