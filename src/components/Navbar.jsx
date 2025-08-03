// src/components/Navbar.jsx (or wherever your +Add Blog button is)
import React, { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import BlogModal from "./BlogModal";
import logo from "../assets/Logo.webp"; // Adjust the path as necessary


export default function Navbar({ onBlogAdded }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-between items-center p-4 border-b">
      <div className="flex items-center">
          <img src={logo} className="h-12 w-12 mr-2" alt="Logo" />
          <div className="text-xl font-bold">React Blog</div>
        </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>+ Add Blog</Button>
        </DialogTrigger>

        <BlogModal
          onBlogAdded={onBlogAdded}
          onClose={() => setOpen(false)}
        />
      </Dialog>
    </div>
  );
}
