function ArticleCard({ article }) {
  return (
    <>
      <h3 id="article-header">{article.title}</h3>
      <img className="preview-img" src={article.article_img_url}></img>
      <section className="article-card-info">
        <p>Author: {article.author}</p>
        <p>Topic: {article.topic}</p>
        <p>Created: {article.created_at}</p>
        <p>Comments: {article.comment_count}</p>
        <button>👍 {article.votes}</button>
      </section>
    </>
  );
}

export default ArticleCard;
