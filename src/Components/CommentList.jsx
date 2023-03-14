import { useState, useEffect } from "react";
import { getCommentsByArticleId } from "../api";

function CommentList({ article_id }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getCommentsByArticleId(article_id).then((commentsData) => {
      setComments(commentsData);
      setIsLoading(false);
    });
  }, [article_id]);

  if (isLoading) {
    return <p>Comments loading...</p>;
  }

  return (
    <ul className="comment-list">
      Comments
      {comments.map((comment) => {
        return (
          <li className="comment" key={comment.comment_id}>
            <p>{comment.body}</p>
            <p>Posted by: {comment.author}</p>
            <p>Posted at: {comment.created_at}</p>
            {/* {comment.votes > 0 ? (
              <button>👍 {comment.votes}</button>
            ) : (
              <button>👎 {comment.votes}</button>
            )} */}
            <button>👍 {comment.votes}</button>
          </li>
        );
      })}
    </ul>
  );
}

export default CommentList;
