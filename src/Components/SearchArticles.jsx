import { useState, useEffect } from "react";
import { getTopics } from "../api";
import Articles from "./Articles";
import { useSearchParams } from "react-router-dom";

function SearchArticles() {
  const [isLoading, setIsLoading] = useState(true);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("show all");
  const [searchParams, setSearchParams] = useSearchParams({});
  const [selectedSortBy, setSelectedSortBy] = useState("votes");
  const [selectedOrder, setSelectedOrder] = useState("DESC");

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

  const handleTopicSelection = (event) => {
    if (event.target.value === "show-all") {
      setSearchParams({});
    } else {
      setSearchParams({ topic: event.target.value });
    }
    setSelectedTopic(event.target.value);
  };

  const handleSortBySelection = (event) => {
    setSelectedSortBy(event.target.value);
  };

  const handleOrderSelection = (event) => {
    setSelectedOrder(event.target.value);
  };

  // problem seems to be that searchParams can't take more than one key value pair and/or overwrites it each time it is set

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <form id="filter-form">
        <label htmlFor="topic">Filter by topic </label>
        <select
          id="topic"
          value={selectedTopic}
          onChange={handleTopicSelection}
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
        <label htmlFor="sort-by">Sort by</label>
        <select
          id="sort-by"
          value={selectedSortBy}
          onChange={handleSortBySelection}
        >
          <option value="votes">popularity</option>
          <option value="comment_count">most comments</option>
          <option value="created_at">most recent</option>
        </select>
        <label htmlFor="order">Order by</label>
        <select
          id="order"
          value={selectedOrder}
          onChange={handleOrderSelection}
        >
          <option value="DESC">descending</option>
          <option value="ASC">ascending</option>
        </select>
      </form>
      <Articles
        searchParams={searchParams}
        selectedSortBy={selectedSortBy}
        selectedOrder={selectedOrder}
      />
    </>
  );
}

export default SearchArticles;
