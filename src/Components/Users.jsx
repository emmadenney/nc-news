import { useState, useEffect } from "react";
import { getUsers } from "../api";
import UserCard from "./UserCard";

function Users({ loggedInUser, setLoggedInUser }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getUsers().then((usersData) => {
      setUsers(usersData);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  return (
    <section>
      <h2>Users</h2>
      <ul className="article-list">
        {users.map((user) => {
          return (
            <li key={user.username} className="article-in-list">
              <UserCard
                user={user}
                key={user.username}
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Users;
