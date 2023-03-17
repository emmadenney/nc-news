import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../api";
import { Link } from "react-router-dom";
import CommentList from "./CommentList";
import Likes from "./Likes";
import moment from "moment";

function SingleArticle({ loggedInUser }) {
  const { article_id } = useParams();

  const [articleData, setArticleData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setErr(null);
    getArticleById(article_id)
      .then((article) => {
        setArticleData(article);
        setIsLoading(false);
      })
      .catch((err) => {
        const msg = err.response.data.msg;
        setErr(msg);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (err) {
    return <p>{err}</p>;
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
      <p id="topic">Published {moment(articleData.created_at).fromNow()}</p>
      <CommentList article_id={article_id} loggedInUser={loggedInUser} />
    </article>
  );
}

export default SingleArticle;
