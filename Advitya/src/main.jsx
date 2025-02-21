import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MiddlePage from "./pages/MiddlePage";
import RiddlePage from "./pages/Riddles";
import LastPage from "./pages/LastPage";
import "./index.css"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/middle" element={<MiddlePage />} />
        <Route path="/riddle/:riddleId" element={<RiddlePage />} />
        <Route path="/thank-you" element={<LastPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
