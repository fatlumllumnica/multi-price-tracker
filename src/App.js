import logo from "./logo.svg";
import React, { useState } from "react";
import "./App.css";

function App() {
  const [code, setCode] = useState("");

  return (
    <div className="App">
      <h1>Multi Price Tracker</h1>
      <p>Enter code here:</p>
      <input
        type="text"
        value={code}
        placeholder="Enter code here..."
        onChange={(e) => setCode(e.target.value)}
      />

      <p>Your search results for {code}: </p>
    </div>
  );
}

export default App;
