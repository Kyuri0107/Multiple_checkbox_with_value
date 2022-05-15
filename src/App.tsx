import React, { useState, useEffect } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/users";
interface User {
  // We only use these three ones
  id: number;
  name: string;
  email: string;

  // We don't care about these properties much
  // So I won't declare types too detailed for them
  username: string;
  address: Object;
  phone: string;
  website: string;
  company: object;
}

const App: React.FunctionComponent = () => {
  // The users who are displayed in the list
  const [users, setUsers] = useState<Array<User>>([]);

  // The ids of users who are removed from the list
  const [ids, setIds] = useState<Array<number>>([]);

  useEffect(() => {
    const fetchData = async (url: string) => {
      try {
        const response = await fetch(url);
        const results = await response.json();
        setUsers(results);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData(API_URL);
  }, []);

  // This function will be triggered when a checkbox changes its state
  const selectUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedId = parseInt(event.target.value);
    console.log(event.target.checked);
    // Check if "ids" contains "selectedIds"
    // If true, this checkbox is already checked
    // Otherwise, it is not selected yet
    if (ids.includes(selectedId)) {
      const newIds = ids.filter((id) => id !== selectedId);
      setIds(newIds);
    } else {
      const newIds = [...ids];
      newIds.push(selectedId);
      setIds(newIds);
    }
  };

  // This function will be called when the "REMOVE SELECTED USERS" is clicked
  const removeUsers = () => {
    // Only keep the users whose ids are not in the "ids" array
    const remainingUsers: User[] = users.filter(
      (user) => !ids.includes(user.id)
    );

    setUsers(remainingUsers);
  };
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      width: 500,
      margin: "10px auto",
      display: "flex",
      flexDirection: "column"
    },
    userItem: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      margin: "6px 0",
      padding: "8px 15px",
      backgroundColor: "#fff9c4"
    },
    userId: {
      width: "5%"
    },
    userName: {
      width: "30%"
    },
    userEmail: {
      width: "40%"
    },
    button: {
      marginTop: 30,
      padding: "15px 30px",
      backgroundColor: "red",
      color: "white",
      fontWeight: "bold",
      border: "none",
      cursor: "pointer"
    }
  };

  return (
    <div style={styles.container}>
      <h2>KindaCode.com - Example</h2>
      {users.length === 0 && <h3>Loading...</h3>}

      {users.length > 0 &&
        users.map((user) => (
          <div style={styles.userItem} key={user.id}>
            <span style={styles.userId}>{user.id}</span>
            <span style={styles.userName}>{user.name}</span>
            <span style={styles.userEmail}>{user.email}</span>
            <span style={styles.userCheckbox}>
              <input
                type="checkbox"
                value={user.id}
                onChange={selectUser}
                checked={ids.includes(user.id) ? true : false}
              />
            </span>
          </div>
        ))}

      <button style={styles.button} onClick={removeUsers}>
        REMOVE SELECTED USERS
      </button>
    </div>
  );
};

// Styling

export default App;
