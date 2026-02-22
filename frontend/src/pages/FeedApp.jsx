import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const FeedApp = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/get-post");
      setPosts(res.data.postData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePost = async () => {
    if (!image || !caption) {
      alert("Please add image and caption");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);

    try {
      setLoading(true);
      await axios.post("http://localhost:3000/api/create-post", formData);
      setImage(null);
      setCaption("");
      fetchPosts();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md mb-8"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Create Post</h2>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-4 w-full"
        />

        <textarea
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full border rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handlePost}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </motion.div>

      {/* Feed Section */}
      <div className="w-full max-w-md space-y-6">
        {posts.map((post) => (
          <motion.div
            key={post._id}
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white shadow rounded-xl p-4 cursor-pointer"
            onClick={() => navigate(`/post/${post._id}`, { state: post })}
          >
            {post.image && (
              <img
                src={post.image}
                alt="post"
                className="w-full h-64 object-cover rounded-lg mb-3"
              />
            )}
            <p className="text-gray-700">{post.caption}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeedApp;