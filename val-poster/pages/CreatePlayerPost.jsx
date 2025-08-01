import React, { useState } from "react";
import { supabase } from "../src/client";
import "./CreatePlayerPost.css";

const CreatePlayerPost = () => {
  const [post, setPost] = useState({
    username: "",
    win_count: "",
    description: "",
    game_mode: "",
    platform: "",
    availability: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createPost = async (event) => {
    event.preventDefault();
    await supabase
      .from("PlayerPoster")
      .insert({
        username: post.username,
        win_count: post.win_count,
        description: post.description,
        game_mode: post.game_mode,
        platform: post.platform,
        availability: post.availability,
      })
      .select();

    window.location = "/";
  };

  return (
    <div className="create-container">
      <h1>Create a Team Post</h1>
      <form>
        <input
          type="text"
          placeholder="Player Username"
          name="username"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Win Count"
          name="win_count"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="What you're looking for"
          name="description"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Game Mode"
          name="game_mode"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Platform"
          name="platform"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Availability"
          name="availability"
          onChange={handleChange}
        />
        <button type="submit" onClick={createPost}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePlayerPost;
