import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import IFrame from "./components/IFrame";
import Reports from "./components/Reports";
import Login from "./components/Login";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check login state from session storage
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("isLoggedIn") === "true"
  );

  useEffect(() => {
    // If the user is NOT logged in and NOT on the reports page, redirect to login
    if (!isLoggedIn && location.pathname !== "/reports" && location.pathname !== "/login") {
      navigate("/login");
    }
  }, [isLoggedIn, location.pathname, navigate]);

  const handleLogin = () => {
    sessionStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    navigate("/"); // Redirect to home after login
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <div className="app">
      <nav style={{ opacity: 0, pointerEvents: "auto" }}>
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/reports")}>Reports</button>
        <button onClick={handleLogout}>Logout</button>
      </nav>

      {location.pathname === "/reports" ? (
        <Reports />
      ) : isLoggedIn ? (
        <IFrame />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
