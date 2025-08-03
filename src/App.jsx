import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import BlogDetail from "./pages/BlogDetail";
import Navbar from "./components/Navbar";

function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs") || "[]");
    setBlogs(storedBlogs);
  }, []);

  const handleBlogAdded = (newBlog) => {
    setBlogs((prev) => {
      const updated = [newBlog, ...prev];
      localStorage.setItem("blogs", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar onBlogAdded={handleBlogAdded} />
        <div className="container mx-auto px-4 py-6 flex-grow">
          <Routes>
            <Route path="/" element={<Home blogs={blogs} />} />
            <Route path="/post/:id" element={<BlogDetail blogs={blogs} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
