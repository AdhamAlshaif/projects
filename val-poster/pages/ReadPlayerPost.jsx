import { useState, useEffect } from "react";
import { supabase } from "../src/client";
import PlayerCard from "../components/playercard";
import "./ReadPlayerPost.css";

const ReadPlayerPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase.from("PlayerPoster").select();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="posts-container">
      {posts && posts.length > 0 ? (
        [...posts]
          .sort((a, b) => a.id - b.id)
          .map((post) => (
            <PlayerCard
              key={post.id}
              id={post.id}
              username={post.username}
              win_count={post.win_count}
              description={post.description}
              game_mode={post.game_mode}
              platform={post.platform}
              availability={post.availability}
            />
          ))
      ) : (
        <h2 className="no-posts">No Gamers Yet 😞</h2>
      )}
    </div>
  );
};

export default ReadPlayerPost;
