import { useState, useEffect } from "react";
import { getCommentsByArticleId } from "../api";
import { Link } from "react-router-dom";
import CommentAdder from "./CommentAdder";

function CommentList({ article_id, loggedInUser }) {
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
      <h3 id="comments-header">Comments</h3>
      <CommentAdder
        loggedInUser={loggedInUser}
        article_id={article_id}
        setComments={setComments}
      />
      {comments === undefined ? (
        <p>No comments</p>
      ) : (
        comments.map((comment) => {
          return (
            <li className="comment" key={comment.comment_id}>
              <p>{comment.body}</p>
              <p>
                Posted by: <Link>{comment.author}</Link>
              </p>
              <p>Posted at: {Date(comment.created_at)}</p>
              <button type="button">👍 {comment.votes}</button>
            </li>
          );
        })
      )}
    </ul>
  );
}

export default CommentList;
