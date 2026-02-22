import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PostDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state;

  if (!post) return <div className="text-center mt-10">Post not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">

      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Back
      </button>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white shadow-xl rounded-xl p-6 max-w-lg w-full"
      >
        {post.image && (
          <img
            src={post.image}
            alt="post"
            className="w-full object-cover rounded-lg mb-4"
          />
        )}
        <p className="text-lg">{post.caption}</p>
      </motion.div>
    </div>
  );
};

export default PostDetails;