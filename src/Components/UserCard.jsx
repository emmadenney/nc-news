import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SingleUser from "./SingleUser";

function UserCard({ user, loggedInUser, setLoggedInUser }) {
  const [buttonStatus, setButtonStatus] = useState(
    `Logged in as ${loggedInUser}`
  );

  useEffect(() => {
    if (loggedInUser === user.username) {
      setButtonStatus(`Logged in as ${loggedInUser}`);
    } else {
      setButtonStatus(`Log in as ${user.username}`);
    }
  }, [loggedInUser]);

  const handleLogIn = () => {
    setLoggedInUser(user.username);
  };

  return (
    <>
      <Link to={`/users/${user.username}`}>
        <img
          className="preview-profile-img"
          src={user.avatar_url}
          alt={`profile pic of ${user.username}`}
        ></img>
      </Link>
      <Link to={`/users/${user.username}`}>
        <h3>{user.username}</h3>
      </Link>
      <button
        type="button"
        onClick={handleLogIn}
        style={{
          backgroundColor:
            buttonStatus === `Logged in as ${loggedInUser}`
              ? "#489699"
              : "#85c1c3",
        }}
      >
        {buttonStatus}
      </button>
    </>
  );
}

export default UserCard;
