// Create a SignUpForm component, and ensure it is the default export. For now, you can have it render a simple h2 with a message saying, "Sign Up".
import { useState } from "react";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setpasswordError] = useState("");

  //   const [token, setToken] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.length < 8) {
      setUsernameError("Username must be at least 8 characters long.");
      return;
    } else {
      setUsernameError("");
    }

    if (password.length < 8) {
      setpasswordError("Password must be at least 8 characters long.");
      return;
    } else {
      setpasswordError("");
    }

    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to sign up");
      }
      const result = await response.json();
      console.log(result);
      setToken(result.token); // needs to be in the try section
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        <button>Submit</button>
      </form>
    </>
  );
}
