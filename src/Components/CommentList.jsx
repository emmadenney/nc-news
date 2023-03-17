import { useState, useEffect } from "react";
import { deleteComment, getCommentsByArticleId } from "../api";
import { Link } from "react-router-dom";
import CommentAdder from "./CommentAdder";
import moment from "moment";

function CommentList({ article_id, loggedInUser }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCommentsByArticleId(article_id).then((commentsData) => {
      setComments(commentsData);
      setIsLoading(false);
    });
  }, [article_id, deleteSuccess]);

  const handleDeleteComment = (event) => {
    event.preventDefault();
    setDeleteSuccess(false);
    const commentId = event.target.value;
    deleteComment(commentId).then(() => {
      const copyComments = comments.map((comment) => {
        if (comment.comment_id !== commentId) {
          return comment;
        }
        return null;
      });
      setComments(copyComments);
      setDeleteSuccess(true);
    });
  };

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
      {deleteSuccess ? <p>Comment deleted successfully</p> : null}
      {comments === undefined ? (
        <p>No comments</p>
      ) : (
        comments.map((comment) => {
          return (
            <li className="comment" key={comment.comment_id}>
              <p>{comment.body}</p>
              <p>
                Posted by <Link>{comment.author}</Link>
              </p>
              <p>Posted {moment(comment.created_at).fromNow()}</p>
              <button type="button">👍 {comment.votes}</button>
              {comment.author === loggedInUser ? (
                <button
                  type="submit"
                  value={comment.comment_id}
                  onClick={handleDeleteComment}
                >
                  Delete comment
                </button>
              ) : null}
            </li>
          );
        })
      )}
    </ul>
  );
}

export default CommentList;
