import React from "react";
import "./App.css";
import { useRoutes } from "react-router-dom";
import { Link } from "react-router-dom";
import ReadPlayerPost from "../pages/ReadPlayerPost";
import CreatePlayerPost from "../pages/CreatePlayerPost";
import EditPlayerPost from '../pages/EditPlayerPost';
import PostDetail from '../pages/PostDetail';

function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <ReadPlayerPost />,
    },
    {
      path: "/create",
      element: <CreatePlayerPost />,
    },
    {
      path: "/edit/:id",
      element: <EditPlayerPost />,
    },
    {
      path: "/post/:id",
      element: <PostDetail />,
    },
  ]);
  return (
    <>
      <div className="header">
        <div className="headerContent">
        <h3> Find WarZone Gamers 🎮</h3>
        <Link to="/" className="link">
          <h3>Browse Gamers 🔍</h3>
        </Link>
        <Link to="/create" className="link">
          <h3>Post About Me 📝</h3>
        </Link>
        </div>
      </div>
      {element}
    </>
  );
}

export default App;
