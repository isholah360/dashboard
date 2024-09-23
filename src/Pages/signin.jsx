import React, { useEffect, useState } from "react";

export default function Signin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <div>
        {users.map((user) => (
          <div key={user.id}>{user.username}</div>
        ))}
      </div>
    </div>
  );
}
