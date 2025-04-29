import styles from "@/styles/Articles.module.css";
import { articles } from "@/data/articles";

const ArticlesPage = () => (
  <div className={styles.container}>
    <h1 className={styles.heading}>Travel Articles</h1>
    <div className={styles.list}>
      {articles.map(({ slug, title, date, excerpt, authorName, authorDesignation, content }) => (
        <div key={slug} className={styles.articleCard}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.excerpt}>{excerpt}</p>
          <p className={styles.meta}>
            By <strong>{authorName}</strong>, <em>{authorDesignation}</em> ·{" "}
            <span>{new Date(date).toDateString()}</span>
          </p>
          <div className={styles.content}>{content}</div>
        </div>
      ))}
      <hr/>
    </div>
  </div>
);

export default ArticlesPage;
