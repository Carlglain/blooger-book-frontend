import { useEffect, useState } from "react";
import axios from 'axios'
import { Routes, Route, Link, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
import CreatePost from "./CreatePost";
import Post from "./Post"
export default function App() {
  return (
    <Router>
      <div className="absolute fixed top-0 w-full flex gap-4 bg-blue-200 p-2">
        <Link to='/' >Home Page</Link>
        <Link to='/create'>Create Post</Link>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </Router>
  )
}