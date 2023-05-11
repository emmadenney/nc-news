function UserCard({ user, isLoggedIn, setLoggedInUser }) {
  // useEffect(() => {
  //   if (loggedInUser === user.username) {
  //     setButtonStatus(`Logged in as ${loggedInUser}`);
  //   } else {
  //     setButtonStatus(`Log in as ${user.username}`);
  //   }
  // }, [loggedInUser]);

  const handleLogIn = () => {
    setLoggedInUser(user.username);
  };

  const buttonStatus = isLoggedIn
    ? `Logged in as ${user.username}`
    : `Log in as ${user.username}`;

  return (
    <>
      <img
        className="preview-profile-img"
        src={user.avatar_url}
        alt={`profile pic of ${user.username}`}
      ></img>
      <h3>{user.username}</h3>
      <button
        type="button"
        onClick={handleLogIn}
        style={{
          backgroundColor: isLoggedIn ? "#489699" : "#85c1c3",
        }}
      >
        {buttonStatus}
      </button>
    </>
  );
}

export default UserCard;
