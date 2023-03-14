import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Nav from "./Components/Nav";
import SingleArticle from "./Components/SingleArticle";

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/articles" element={<Home />}></Route>
        <Route path="/articles/:article_id" element={<SingleArticle />}></Route>
      </Routes>
    </div>
  );
}

export default App;
