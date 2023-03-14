import { useState } from "react";
import { postComment } from "../api";

function CommentAdder({ article_id, loggedInUser, setComments }) {
  const [newComment, setNewComment] = useState("");
  const [err, setErr] = useState(null);
  const [postSuccess, setPostSuccess] = useState(false);
  const [disabledStatus, setDisabledStatus] = useState(false);

  const handleChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPostSuccess(false);
    setDisabledStatus(true);
    postComment(article_id, { username: loggedInUser, body: newComment })
      .then((newCommentResponse) => {
        console.log(newCommentResponse);
        setComments((currComments) => {
          return [newCommentResponse, ...currComments];
        });
        setNewComment("");
        setPostSuccess(true);
        setErr(null);
        setDisabledStatus(false);
      })
      .catch((err) => {
        setErr("Post unsuccessful");
      });
  };

  return (
    <form className="post-comment-form" onSubmit={handleSubmit}>
      <textarea
        id="addComment"
        placeholder="Write a comment..."
        value={newComment}
        onChange={handleChange}
        required
      ></textarea>
      {err ? <p>{err}</p> : null}
      {postSuccess ? <p>Comment posted successfully!</p> : null}
      <button type="submit" disabled={disabledStatus}>
        Add comment
      </button>
    </form>
  );
}

export default CommentAdder;
