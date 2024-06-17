import { useState } from "react";

export default function Authenticate({ token }) {
  console.log(token); // check for token
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null); // Add state for username

  async function handleClick() {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      setSuccessMessage(result.message);
      setUsername(result.username); // get username from data property
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="welcome">
      <h2>Authenticate</h2>
      {successMessage && <p>{successMessage}</p>}

      {error && <p>{error}</p>}
      <button onClick={handleClick}>Authenticate Token!</button>
      {username ? (
        <p className="welcome">Welcome, {username}!</p>
      ) : (
        <p className="welcome">User info unavailable.</p>
      )}
    </div>
  );
}
