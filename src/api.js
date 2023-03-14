import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://news-0rwt.onrender.com/api",
});

export const getArticles = () => {
  return ncNewsApi
    .get("/articles?sort_by=votes&order=DESC")
    .then((response) => {
      const data = response.data.articles;
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
  console.log(article_id, commentBody);
  return ncNewsApi
    .post(`/articles/${article_id}/comments`, commentBody)
    .then((response) => {
      console.log(response);
      return response.data.comment;
    });
};

