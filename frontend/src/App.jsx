import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FeedApp from "./pages/FeedApp";
import PostDetails from "./pages/PostDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FeedApp />} />
        <Route path="/post/:id" element={<PostDetails />} />
      </Routes>
    </Router>
  );
}

export default App;