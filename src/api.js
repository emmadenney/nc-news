import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://news-0rwt.onrender.com/api",
});

export const getArticles = (topic, sort_by, order) => {
  return ncNewsApi
    .get(`/articles`, {
      params: {
        ...(topic !== "show all" && { topic }),
        sort_by,
        order,
      },
    })
    .then((response) => {
      const data = response.data.articles;
      console.log(data);
      return data;
    });
};

export const getArticleById = (article_id) => {
  return ncNewsApi.get(`/articles/${article_id}`).then((response) => {
    const data = response.data.article;
    return data;
  });
};

export const getCommentsByArticleId = (article_id) => {
  return ncNewsApi.get(`/articles/${article_id}/comments`).then((response) => {
    const data = response.data.comments;
    return data;
  });
};

export const patchArticleVotes = (article_id, vote_change) => {
  return ncNewsApi
    .patch(`/articles/${article_id}`, { inc_votes: `${vote_change}` })
    .then((response) => {
      console.log(response.data);
    });
};

export const postComment = (article_id, commentBody) => {
  return ncNewsApi
    .post(`/articles/${article_id}/comments`, commentBody)
    .then((response) => {
      return response.data.comment;
    });
};

export const getTopics = () => {
  return ncNewsApi.get("/topics").then((response) => {
    const data = response.data.topics;
    return data;
  });
};

export const getUsers = () => {
  return ncNewsApi.get("/users").then(({ data }) => {
    return data.users;
  });
};

export const deleteComment = (comment_id) => {
  return ncNewsApi.delete(`/comments/${comment_id}`).then(() => {
    console.log("deleted!");
  });
};
