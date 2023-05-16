import { useState, useEffect, useMemo } from "react";
import { getTopics } from "../api";
import Articles from "./Articles";
import { useSearchParams } from "react-router-dom";

const isValidTopic = (topic) =>
  ["football", "cooking", "coding", "show all"].includes(topic);
const isValidSortBy = (sort_by) => ["votes", "created_at"].includes(sort_by);
const isValidOrder = (order) => ["ASC", "DESC"].includes(order);

function SearchArticles() {
  const [isLoading, setIsLoading] = useState(true);
  const [topics, setTopics] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const urlTopic = searchParams.get("topic");
  const urlSortBy = searchParams.get("sort_by");
  const urlOrder = searchParams.get("order");

  const [selectedTopic, setSelectedTopic] = useState(
    isValidTopic(urlTopic) ? urlTopic : "show all"
  );
  const [selectedSortBy, setSelectedSortBy] = useState(
    isValidSortBy(urlSortBy) ? urlSortBy : "votes"
  );
  const [selectedOrder, setSelectedOrder] = useState(
    isValidOrder(urlOrder) ? urlOrder : "DESC"
  );

  const err = useMemo(() => {
    if (!isValidTopic(urlTopic) && urlTopic !== null) {
      return "Invalid topic";
    }
    if (
      (!isValidSortBy(urlSortBy) && urlSortBy !== null) ||
      (!isValidOrder(urlOrder) && urlOrder !== null)
    ) {
      return "404 page not found";
    }
  }, [urlTopic, urlSortBy, urlOrder]);

  useEffect(() => {
    if (
      !err &&
      (selectedTopic !== urlTopic ||
        selectedSortBy !== urlSortBy ||
        selectedOrder !== urlOrder)
    ) {
      setSearchParams({
        sort_by: selectedSortBy,
        order: selectedOrder,
        topic: selectedTopic,
      });
    }
  }, [
    selectedTopic,
    selectedSortBy,
    selectedOrder,
    urlTopic,
    urlOrder,
    urlSortBy,
    setSearchParams,
    err,
  ]);

  useEffect(() => {
    setIsLoading(true);
    getTopics().then((topicsData) => {
      setTopics(topicsData);
      setIsLoading(false);
    });
  }, []);

  const handleTopicSelection = (event) => {
    setSelectedTopic(event.target.value);
  };

  const handleSortBySelection = (event) => {
    const value = event.target.value;
    const selections = value.split(" ");
    setSelectedSortBy(selections[0]);
    setSelectedOrder(selections[1]);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (err) {
    return <p>{err}</p>;
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
          <option value="show all">show all</option>
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
          value={`${selectedSortBy} ${selectedOrder}`}
          onChange={handleSortBySelection}
        >
          <option value="votes DESC">most popular</option>
          <option value="votes ASC">least popular</option>
          <option value="created_at DESC">most recent</option>
          <option value="created_at ASC">oldest</option>
        </select>
      </form>
      <Articles
        selectedSortBy={selectedSortBy}
        selectedOrder={selectedOrder}
        selectedTopic={selectedTopic}
      />
    </>
  );
}

export default SearchArticles;
