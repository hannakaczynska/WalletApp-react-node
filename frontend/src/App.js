import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("🔍 Attempting to fetch from backend");
    fetch("http://localhost:3001/api/test")
      .then((res) => {
        console.log("📥 Response status:", res.status);
        console.log("📥 Response ok:", res.ok);
        return res.json();
      })
      .then((data) => {
        console.log("📋 Data received:", data);
        setMessage(data.message);
      })
      .catch((err) => {
        console.error("❌ Failed to connect:", err);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <h1>{message || "I am waiting for response from the server"}</h1>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
