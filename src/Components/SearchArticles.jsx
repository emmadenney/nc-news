import { useState, useEffect } from "react";
import { getTopics } from "../api";
import Articles from "./Articles";
import { Link } from "react-router-dom";

function SearchArticles() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("Show all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getTopics().then((topicsData) => {
      setTopics(topicsData);
      setIsLoading(false);
    });
  }, []);

  const handleChange = (event) => {
    setSelectedTopic(event.target.value);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  console.log(topics);

  return (
    <>
      <form id="filter-form">
        <label htmlFor="filter-topics">Filter by topic </label>
        <select
          id="filter-topics"
          value={selectedTopic}
          onChange={handleChange}
        >
          <Link to="/articles">
            <option>Show all</option>
          </Link>
          {topics.map((topic) => {
            return (
              <Link to={`/articles?topic=${topic}`} key={topic.slug}>
                <option>{topic.slug}</option>
              </Link>
            );
          })}
          {/* ^^ this doesn't seem to work (wrapping a link around a dropdown option) so might need to investigate that or just use selectedTopic state to determine which articles are showing and then create those pages as routes in app somehow? */}
        </select>
      </form>
      {selectedTopic === "Show all" ? <Articles /> : null}
      {/* ^^ will this render articles twice because of rendering on Home too? */}
    </>
  );
}

export default SearchArticles;
