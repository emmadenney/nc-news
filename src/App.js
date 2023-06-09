import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Nav from "./Components/Nav";
import SingleArticle from "./Components/SingleArticle";
import { useState } from "react";
import Users from "./Components/Users";

function App() {
  const [loggedInUser, setLoggedInUser] = useState("grumpy19");

  return (
    <div className="App">
      <Header loggedInUser={loggedInUser} />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/articles/:article_id"
          element={<SingleArticle loggedInUser={loggedInUser} />}
        ></Route>
        <Route
          path="/users"
          element={
            <Users
              loggedInUser={loggedInUser}
              setLoggedInUser={setLoggedInUser}
            />
          }
        ></Route>
        <Route path="/*" element={<p>404 page not found!</p>}></Route>
      </Routes>
    </div>
  );
}

export default App;
