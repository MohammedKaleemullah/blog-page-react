import { useEffect, useState, useRef, useCallback } from "react";
import BlogCard from "../components/BlogCard";

const BATCH_SIZE = 6;

function Home() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [visibleBlogs, setVisibleBlogs] = useState([]);
  const observerRef = useRef();

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs") || "[]");
    setAllBlogs(storedBlogs);
    setVisibleBlogs(storedBlogs.slice(0, BATCH_SIZE));
  }, []);

  const lastBlogRef = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [visibleBlogs, allBlogs]
  );

  const loadMore = () => {
    setVisibleBlogs((prev) => {
      const next = allBlogs.slice(prev.length, prev.length + BATCH_SIZE);
      return [...prev, ...next];
    });
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {visibleBlogs.map((blog, index) => {
          const isLast = index === visibleBlogs.length - 1;
          return (
            <div
              key={blog.id}
              ref={isLast ? lastBlogRef : null}
            >
              <BlogCard
                id={blog.id}
                title={blog.title}
                content={blog.content}
                author="Anonymous"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
