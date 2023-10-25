import logo from "./logo.svg";
import React, { useState } from "react";
import "./App.css";
import Scrape from "./Fetching";

function App() {
  const [code, setCode] = useState("");

  return (
    <div className="App container">
      <div className="App-header">
        <h1>Multi Price Tracker</h1>
      </div>
      <div className="container search-bar">
        <div className="column">
          <div className="col-12">
            <div className="d-flex flex-column  min-vh-50">
              <div className="justify-content-center align-items-center text-center">
                <input
                  className="shadow-lg p-3 m-4 rounded"
                  type="text"
                  value={code}
                  placeholder="Search.."
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <p>Your search results for {code}: </p>
      <ul>
        <li>Auto Llapi: </li>
        <li>Jehona: </li>
        <li>Haxhijaha: </li>
        <li>Globali: </li>
      </ul>
      <Scrape />
    </div>
  );
}

export default App;
