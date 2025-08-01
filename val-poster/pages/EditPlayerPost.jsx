import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../src/client";
import "./EditPlayerPost.css";

const EditPlayerPost = () => {
  const { id } = useParams();

  const [post, setPost] = useState({
    username: "",
    win_count: "",
    description: "",
    game_mode: "",
    platform: "",
    availability: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from("PlayerPoster")
        .select()
        .eq("id", id)
        .single();
      if (data) setPost(data);
    };
    fetchPost();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updatePost = async (event) => {
    event.preventDefault();
    await supabase
      .from("PlayerPoster")
      .update({
        username: post.username,
        win_count: post.win_count,
        description: post.description,
        game_mode: post.game_mode,
        platform: post.platform,
        availability: post.availability,
      })
      .eq("id", id);
    window.location = "/";
  };

  const deletePost = async (event) => {
    event.preventDefault();
    await supabase.from("PlayerPoster").delete().eq("id", id);
    window.location = "/";
  };

  return (
    <div className="edit-container">
      <h2>Edit Post</h2>
      <form>
        <input
          className="edit-input"
          type="text"
          placeholder="Player Username"
          name="username"
          value={post.username}
          onChange={handleChange}
        />
        <input
          className="edit-input"
          type="text"
          placeholder="Win Count"
          name="win_count"
          value={post.win_count}
          onChange={handleChange}
        />
        <input
          className="edit-input"
          type="text"
          placeholder="What you're looking for"
          name="description"
          value={post.description}
          onChange={handleChange}
        />
        <input
          className="edit-input"
          type="text"
          placeholder="Game Mode"
          name="game_mode"
          value={post.game_mode}
          onChange={handleChange}
        />
        <input
          className="edit-input"
          type="text"
          placeholder="Platform"
          name="platform"
          value={post.platform}
          onChange={handleChange}
        />
        <input
          className="edit-input"
          type="text"
          placeholder="Availability"
          name="availability"
          value={post.availability}
          onChange={handleChange}
        />
        <button type="submit" onClick={updatePost}>
          Update Post
        </button>
        <button type="button" onClick={deletePost}>
          Delete Post
        </button>
      </form>
    </div>
  );
};

export default EditPlayerPost;
