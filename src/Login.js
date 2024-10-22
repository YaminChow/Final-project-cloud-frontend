import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css"; // Import the CSS file

const Login = ({ setCurrentUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Function to handle login via API Gateway
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Call the API Gateway endpoint for login
      const response = await fetch(
        "https://9q7h11pvif.execute-api.us-east-1.amazonaws.com/dev/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // If login is successful, store user data in localStorage and set the current user
        localStorage.setItem("user", JSON.stringify(data.user));
        setCurrentUser(data.user);
        navigate(`/profile/${email}`); // Redirect to the profile page
      } else {
        alert(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Error logging in. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
