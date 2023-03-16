import { useState, useEffect } from "react";
import { getTopics } from "../api";
import Articles from "./Articles";
import { useSearchParams } from "react-router-dom";

function SearchArticles() {
  const [isLoading, setIsLoading] = useState(true);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("show all");
  const [selectedSortBy, setSelectedSortBy] = useState("votes");
  const [selectedOrder, setSelectedOrder] = useState("DESC");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    getTopics().then((topicsData) => {
      setTopics(topicsData);
      setIsLoading(false);
      searchParams.set("sort_by", "votes");
      searchParams.set("order", "DESC");
    });
    if (searchParams.get("topic")) {
      setSelectedTopic(searchParams.get("topic"));
    }
  }, []);

  const handleTopicSelection = (event) => {
    setSelectedTopic(event.target.value);
    if (event.target.value === "show-all") {
      searchParams.delete("topic");
    } else {
      searchParams.set("topic", event.target.value);
    }
  };

  const handleSortBySelection = (event) => {
    const value = event.target.value;
    const selections = value.split(" ");
    setSelectedSortBy(selections[0]);
    setSelectedOrder(selections[1]);
    searchParams.set("sort_by", selections[0]);
    searchParams.set("order", selections[1]);
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
          <option value="votes DESC">most popular</option>
          <option value="votes ASC">least popular</option>
          <option value="created_at DESC">most recent</option>
          <option value="created_at ASC">oldest</option>
          <option value="comment_count DESC">most comments</option>
          <option value="comment_count DESC">least comments</option>
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
