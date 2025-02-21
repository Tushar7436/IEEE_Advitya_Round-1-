import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner"; // Import Sonner for notifications
import HomePage from "./Pages/HomePage";
import MiddlePage from "./Pages/MiddlePage";
import RiddlePage from "./Pages/Riddles";
import LastPage from "./Pages/LastPage";
import "./index.css"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Toaster position="top-right" richColors /> {/* Add Toaster here */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/middle" element={<MiddlePage />} />
        <Route path="/riddle/:riddleId" element={<RiddlePage />} />
        <Route path="/thank-you" element={<LastPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
