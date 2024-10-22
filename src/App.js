// App.js
import React, { useState } from "react";
import SignUp from "./SignUp"; // No curly braces
import Login from "./Login"; // No curly braces
import Profile from "./Profile"; // No curly braces

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Router>
      <div>
        <nav>
          <Link to="/signup">Sign Up</Link> | <Link to="/login">Login</Link>
        </nav>
        <Routes>
          <Route
            path="/signup"
            element={<SignUp setCurrentUser={setCurrentUser} />}
          />
          <Route
            path="/login"
            element={<Login setCurrentUser={setCurrentUser} />}
          />
          <Route
            path="/profile/:email"
            element={<Profile user={currentUser} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
