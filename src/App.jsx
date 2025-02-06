import React, { useState, useEffect } from "react";
import IFrame from "./components/IFrame";
import Login from "./components/Login";
import Reports from "./components/Reports";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
    window.history.pushState({}, "", "/home"); // Default page after login
    setCurrentPage("home");
  };

  // Function to handle navigation
  const navigateTo = (page) => {
    setCurrentPage(page);
    window.history.pushState({}, "", `/${page}`); // Update URL
  };

  // Handle browser navigation (back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace("/", "");
      setCurrentPage(path || "home");
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <div className="app">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          {/* Navigation Buttons */}
          <nav>
            <button onClick={() => navigateTo("home")}>Home</button>
            <button onClick={() => navigateTo("reports")}>Reports</button>
          </nav>

          {/* Conditionally Render Components Based on URL */}
          {currentPage === "home" && <IFrame />}
          {currentPage === "reports" && <Reports />}
        </>
      )}
    </div>
  );
};

export default App;
