import { useState, useEffect } from "react";
import { getTopics } from "../api";
import Articles from "./Articles";
import { useSearchParams } from "react-router-dom";

function SearchArticles() {
  const [isLoading, setIsLoading] = useState(true);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("show all");
  const [searchParams, setSearchParams] = useSearchParams({});

  useEffect(() => {
    setIsLoading(true);
    getTopics().then((topicsData) => {
      setTopics(topicsData);
      setIsLoading(false);
    });
    // if (searchParams.get("topic")) {
    //   setSelectedTopic(searchParams.get("topic"));
    // }
  }, []);

  const handleChange = (event) => {
    if (event.target.value === "show-all") {
      setSearchParams({});
    } else {
      setSearchParams({ topic: event.target.value });
    }
    setSelectedTopic(event.target.value);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <form id="filter-form">
        <label htmlFor="filter-topics">Filter by topic </label>
        <select
          id="filter-topics"
          value={selectedTopic}
          onChange={handleChange}
        >
          <option value="show-all">show all</option>
          {topics.map((topic) => {
            return (
              <option value={topic.slug} key={topic.slug}>
                {topic.slug}
              </option>
            );
          })}
        </select>
      </form>
      <Articles searchParams={searchParams} />
    </>
  );
}

export default SearchArticles;
