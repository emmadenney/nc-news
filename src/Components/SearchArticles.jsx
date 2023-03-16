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
  const [searchParams, setSearchParams] = useSearchParams({});
  const [params, setParams] = useState({
    sort_by: "votes",
    order: "DESC",
  });

  useEffect(() => {
    setIsLoading(true);
    getTopics().then((topicsData) => {
      setTopics(topicsData);
      setIsLoading(false);
    });
    // to set the filter dropdowns to be the same as anything searched/copy&pasted into the url
    if (searchParams.get("topic")) {
      setSelectedTopic(searchParams.get("topic"));
    }
    if (searchParams.get("sort_by")) {
      setSelectedSortBy(searchParams.get("sort_by"));
    }
    if (searchParams.get("order")) {
      setSelectedOrder(searchParams.get("order"));
    }
  }, []);

  // listens for any changes in params state and then updates searchParams
  useEffect(() => {
    setSearchParams(params);
  }, [params]);

  // runs once (because no dependancies) to check for any searchParams in the url and set them in params state (because params is used to update searchParams if any filters change later and we want to maintain any currParams)
  useEffect(() => {
    const topic = searchParams.get("topic");
    const sort_by = searchParams.get("sort_by");
    const order = searchParams.get("order");
    setParams({
      ...(topic && { topic }),
      ...(sort_by && { sort_by }),
      ...(order && { order }),
    });
    // ^^ this is a shortcircuit - if the thing before '&&' evaluates to true, only then will the thing after '&&' happen. I.e. if there is a topic present in searchParams, then a key value pair of {topic: topic} will be set in params state
  }, []);

  const handleTopicSelection = (event) => {
    setSelectedTopic(event.target.value);
    if (event.target.value === "show-all") {
      const copyParams = { ...params };
      delete copyParams.topic;
      setParams(copyParams);
    } else {
      setParams((currParams) => ({
        ...currParams,
        topic: event.target.value,
      }));
    }
  };

  const handleSortBySelection = (event) => {
    const value = event.target.value;
    const selections = value.split(" ");
    setSelectedSortBy(selections[0]);
    setSelectedOrder(selections[1]);
    setParams((currParams) => ({
      ...currParams,
      sort_by: selections[0],
    }));
    setParams((currParams) => ({
      ...currParams,
      order: selections[1],
    }));
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
          value={params.topic || "show all"}
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
          value={`${params.sort_by} ${params.order}`}
          onChange={handleSortBySelection}
        >
          <option value="votes DESC">most popular</option>
          <option value="votes ASC">least popular</option>
          <option value="created_at DESC">most recent</option>
          <option value="created_at ASC">oldest</option>
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
