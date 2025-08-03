// src/components/BlogModal.jsx
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function BlogModal({ onBlogAdded, onClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    if (!title.trim() || !content.trim()) {
      setError("Both fields are required.");
      return;
    }

    const newBlog = {
      id: uuidv4(),
      title,
      content,
      createdAt: new Date().toISOString(),
    };

    const stored = JSON.parse(localStorage.getItem("blogs") || "[]");
    const updated = [newBlog, ...stored];
    localStorage.setItem("blogs", JSON.stringify(updated));
    onBlogAdded(newBlog);

    setTitle("");
    setContent("");
    setError("");
    onClose(); // close modal
  };

  return (
    <DialogContent>
      <DialogTitle>Add New Blog</DialogTitle>
      <div className="flex flex-col gap-4">
        <Input
          placeholder="Enter blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)} required
        />
        <textarea
  className="w-full rounded-md p-2 border focus:outline-none focus:ring-2 focus:ring-black resize-none overflow-y-auto break-words"
  rows={6}
  value={content}
  onChange={(e) => setContent(e.target.value)}
  placeholder="Enter blog content..." required></textarea>
        <Button onClick={handleAdd}>Post</Button>
      </div>
    </DialogContent>
  );
}
