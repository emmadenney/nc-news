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
