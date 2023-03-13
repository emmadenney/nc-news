import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="nav">
      <Link to="/">
        <button className="nav-button">Home</button>
      </Link>
      <button className="nav-button">Users</button>
      <Link to="/articles">
        <button className="nav-button">Articles</button>
      </Link>
    </nav>
  );
}

export default Nav;
