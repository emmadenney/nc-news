import { useEffect, useState } from "react";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getArticles().then((articlesData) => {
      setArticles(articlesData);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <p>Loading articles...</p>;
  }

  return (
    <section>
      <h2>Top Rated Articles</h2>
      <ul className="article-list">
        {articles.map((article) => {
          return (
            <li className="article-in-list" key={article.article_id}>
              <ArticleCard article={article} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Articles;
