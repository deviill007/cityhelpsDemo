// pages/articles/[slug].tsx

import { useRouter } from "next/router";
import { articles } from "@/data/articles";
import Head from "next/head";

const ArticlePage = () => {
  const { query } = useRouter();
  const article = articles.find((a) => a.slug === query.slug);

  if (!article) return <p>Loading...</p>;

  return (
    <>
      <Head>
        <title>{article.seo.title}</title>
        <meta name="description" content={article.seo.description} />
        <meta name="keywords" content={article.seo.keywords.join(", ")} />
      </Head>

      <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
        <h1>{article.title}</h1>
        <p>
          By <strong>{article.authorName}</strong>,{" "}
          <em>{article.authorDesignation}</em> ·{" "}
          {new Date(article.date).toDateString()}
        </p>
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>
    </>
  );
};

export default ArticlePage;
