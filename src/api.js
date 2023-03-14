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
