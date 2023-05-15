import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="nav">
      <Link to="/">
        <button type="button">Home</button>
      </Link>
      <Link to="/users">
        <button type="button">Users</button>
      </Link>
    </nav>
  );
}

export default Nav;
