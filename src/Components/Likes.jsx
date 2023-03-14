import { patchArticleVotes } from "../api";
import { useState } from "react";

function Likes({ articleData }) {
  const { article_id } = articleData;
  const [votes, setVotes] = useState(articleData.votes);

  const upVote = (article_id, vote_change) => {
    setVotes((currVotes) => {
      return currVotes + 1;
    });
    patchArticleVotes(article_id, vote_change).catch(() => {
      setVotes((currVotes) => {
        return currVotes - 1;
      });
    });
  };

  const downVote = (article_id, vote_change) => {
    setVotes((currVotes) => {
      return currVotes - 1;
    });
    patchArticleVotes(article_id, vote_change).catch(() => {
      setVotes((currVotes) => {
        return currVotes + 1;
      });
    });
  };

  return (
    <section>
      <button
        type="button"
        id="article-like"
        onClick={() => downVote(article_id, -1)}
      >
        👎
      </button>
      <button
        type="button"
        id="article-like"
        onClick={() => upVote(article_id, 1)}
      >
        👍
      </button>
      <p id="article-like">❤️{votes} </p>
    </section>
  );
}

export default Likes;
