import logo from "../icons8-morning-news-90.png";
import { Link } from "react-router-dom";

function Header({ loggedInUser }) {
  return (
    <header className="App-header">
      <Link to="/">
        <img src={logo} className="App-logo" alt="logo" />
      </Link>
      NC News
      <p id="loggedUser">Logged in as: {loggedInUser}</p>
    </header>
  );
}

export default Header;
