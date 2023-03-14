import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, patchArticleVotes } from "../api";
import { Link } from "react-router-dom";
import CommentAdder from "./CommentAdder";
import CommentList from "./CommentList";
import Likes from "./Likes";

function SingleArticle() {
  const { article_id } = useParams();

  const [articleData, setArticleData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id).then((article) => {
      setArticleData(article);
      setIsLoading(false);
    });
  }, [article_id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <article className="article-page">
      <h2>{articleData.title}</h2>
      <p id="by-line">
        by <Link>{articleData.author}</Link>
      </p>
      <Likes articleData={articleData} setArticleData={setArticleData} />
      <p id="topic">Topic: {articleData.topic}</p>
      <img
        src={articleData.article_img_url}
        className="img_single_article"
        alt={articleData.title}
      ></img>
      <p id="body-text">{articleData.body}</p>
      <p id="topic">Created at {articleData.created_at}</p>
      <CommentAdder />
      <CommentList article_id={article_id} />
    </article>
  );
}

export default SingleArticle;
