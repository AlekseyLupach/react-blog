import React, { useState, useEffect } from "react";
import axios from "axios";
import "./sidebar.css";
import { Link } from "react-router-dom";

function Sidebar() {
  const [cats, setCat] = useState([]);
  const [activeButtonId, setActiveButtonId] = useState("");

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCat(res.data);
    };
    getCats();
  }, []);

  const handleButtonClick = (e) => {
    setActiveButtonId(e.target.id);
  };

  return (
    <div className="sidebar">
      <ul className="sidebarList">
        <Link to="/">
          <li
            className={
              activeButtonId === ""
                ? "active sidebarListItem"
                : "sidebarListItem"
            }
            onClick={() => setActiveButtonId("")}
          >
            All
          </li>
        </Link>
        {cats.map((cat) => (
          <Link to={`/?cat=${cat.name}`} className="link">
            <li
              key={cat._id}
              className={
                cat._id === activeButtonId
                  ? "active sidebarListItem"
                  : "sidebarListItem"
              }
              onClick={handleButtonClick}
              id={cat._id}
            >
              {cat.name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
