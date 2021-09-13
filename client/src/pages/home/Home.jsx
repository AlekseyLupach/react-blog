import React, { useState, useEffect } from "react";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router";

function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("/posts" + search);
      setPosts(response.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <div className="home">
        <Sidebar />
        <Posts posts={posts} />
      </div>
    </>
  );
}

export default Home;
