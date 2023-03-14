import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../api";
import { Link } from "react-router-dom";
import CommentAdder from "./CommentAdder";
import CommentList from "./CommentList";

function SingleArticle() {
  const { article_id } = useParams();

  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id).then((articleData) => {
      setArticle(articleData);
      setIsLoading(false);
    });
  }, [article_id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <article>
      <h2>{article.title}</h2>
      <p id="by_line">
        by <Link>{article.author}</Link>
      </p>
      <p>Topic: {article.topic}</p>
      <img
        src={article.article_img_url}
        className="img_single_article"
        alt={article.title}
      ></img>
      <p>{article.body}</p>
      <p>Created at {article.created_at}</p>
      <CommentAdder />
      <CommentList article_id={article_id} />
    </article>
  );
}

export default SingleArticle;
