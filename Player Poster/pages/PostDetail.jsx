import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../src/client";
import "./PostDetail.css";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from("PlayerPoster")
        .select()
        .eq("id", id)
        .single();
      
      setPost(data);
    };
    fetchPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-detail-container">
      <h1>{post.username}'s Profile</h1>
      
      <p><strong>Username:</strong> {post.username}</p>
      <p><strong>Win Count:</strong> {post.win_count}</p>
      <p><strong>Description:</strong> {post.description}</p>
      <p><strong>Game Mode:</strong> {post.game_mode}</p>
      <p><strong>Platform:</strong> {post.platform}</p>
      <p><strong>Availability:</strong> {post.availability}</p>
            <Link to={`/edit/${post.id}`}>
        <button>Edit This Post</button>
      </Link>

      <Link to="/">
        <button>Back to All Posts</button>
      </Link>
    </div>
  );
};

export default PostDetail;
