import { Link } from "react-router-dom";
import Likes from "./Likes";
import moment from "moment";

function ArticleCard({ article }) {
  return (
    <article>
      <Link to={`/articles/${article.article_id}`}>
        <h3>{article.title}</h3>
      </Link>
      <Link to={`/articles/${article.article_id}`}>
        <img
          className="preview-img"
          src={article.article_img_url}
          alt={article.title}
        ></img>
      </Link>
      <p>Author: {article.author}</p>
      <p>Topic: {article.topic}</p>
      <p>Created: {moment(article.created_at).fromNow()}</p>
      <Likes articleData={article} />
      <p>Comments: {article.comment_count}</p>
    </article>
  );
}

export default ArticleCard;
