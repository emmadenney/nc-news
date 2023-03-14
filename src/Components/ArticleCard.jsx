import { Link } from "react-router-dom";
import Likes from "./Likes";

function ArticleCard({ article }) {
  return (
    <article>
      <Link to={`/articles/${article.article_id}`}>
        <h3 id="article-header">{article.title}</h3>
      </Link>
      <img
        className="preview-img"
        src={article.article_img_url}
        alt={article.title}
      ></img>
      <p>Author: {article.author}</p>
      <p>Topic: {article.topic}</p>
      <p>Created: {Date(article.created_at)}</p>
      <p>Comments: {article.comment_count}</p>
      <Likes articleData={article} />
    </article>
  );
}

export default ArticleCard;
