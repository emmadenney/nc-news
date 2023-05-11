import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="nav">
      <Link to="/">
        <button type="button" className="nav-button">
          Home
        </button>
      </Link>
      <Link to="/users">
        <button type="button" className="nav-button">
          Users
        </button>
      </Link>
    </nav>
  );
}

export default Nav;
