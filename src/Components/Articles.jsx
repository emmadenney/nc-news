import { useState, useEffect } from "react";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";

function Articles({ searchParams, selectedSortBy, selectedOrder }) {
  const [articlesByTopic, setArticlesByTopic] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalArticles, setTotalArticles] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    getArticles(searchParams.get("topic"), selectedSortBy, selectedOrder).then(
      (articlesData) => {
        setArticlesByTopic(articlesData);
        setTotalArticles(articlesData.length);
        setIsLoading(false);
      }
    );
  }, [searchParams, selectedSortBy, selectedOrder]);

  if (isLoading) {
    return <p>Loading articles...</p>;
  }

  return (
    <section>
      {searchParams.get("topic") ? (
        <h2>Articles on {searchParams.get("topic")}</h2>
      ) : (
        <h2>Top Rated Articles</h2>
      )}

      <p>{totalArticles} Articles</p>
      <ul className="article-list">
        {articlesByTopic.map((article) => {
          return (
            <li key={article.article_id} className="article-in-list">
              <ArticleCard article={article} key={article.article_id} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Articles;
