import { Link } from "react-router-dom";
import Likes from "./Likes";
import moment from "moment";

function ArticleCard({ article }) {
  return (
    <article>
      <Link to={`/articles/${article.article_id}`}>
        <h3 id="article-header">{article.title}</h3>
      </Link>
      <Link to={`/articles/${article.article_id}`}>
        <img
          className="preview-img"
          src={article.article_img_url}
          alt={article.title}
        ></img>
      </Link>
      <p>
        Author: <Link>{article.author}</Link>
      </p>
      <p>
        Topic:{" "}
        <Link to={`/articles?topic=${article.topic}`}>{article.topic}</Link>
      </p>
      <p>Created: {moment(article.created_at).fromNow()}</p>
      <Likes articleData={article} />
      <p id="comments-preview">Comments: {article.comment_count}</p>
    </article>
  );
}

export default ArticleCard;
