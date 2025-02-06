import React, { useState, useEffect } from "react";
import IFrame from "./components/IFrame";
import Reports from "./components/Reports";
import Login from "./components/Login";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem("isLoggedIn") === "true";
  });

  const [currentPage, setCurrentPage] = useState(() => {
    return window.location.pathname.replace("/", "") || "home";
  });

  // Handle Login
  const handleLogin = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem("isLoggedIn", "true"); // Store login state in session
    navigateTo("home");
  };

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("isLoggedIn"); 
    navigateTo("");
  };

  // Handle Navigation
  const navigateTo = (page) => {
    setCurrentPage(page);
    window.history.pushState({}, "", `/${page}`);
  };

  // Handle Browser Back/Forward Navigation
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
          {/* Navigation */}
          <nav style={{ opacity: 0, pointerEvents: "auto" }}>
            <button onClick={() => navigateTo("home")}>Home</button>
            <button onClick={() => navigateTo("reports")}>Reports</button>
            <button onClick={handleLogout}>Logout</button>
          </nav>

          {/* Page Rendering */}
          {currentPage === "home" && <IFrame />}
          {currentPage === "reports" && <Reports />}
        </>
      )}
    </div>
  );
};

export default App;
