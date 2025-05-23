import React, { useEffect, useState } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import Header from '../header/Header';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`http://127.0.0.1:3000/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlog(response.data.blog || response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <p className="text-center">Loading blog...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>
      <p className="text-gray-600 mb-4">{blog.content}</p>
      <div className="flex items-center space-x-4">
        <img
          src={`https://api.dicebear.com/8.x/thumbs/svg?seed=user${blog.user_id}`}
          alt="Author"
          className="w-10 h-10 rounded-full"
        />
        <span className="text-gray-700">By User{blog.user_id}</span>
      </div>
      <div className="mt-4">
        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
          #{Array.isArray(blog.tags) ? blog.tags.join(', ') : 'General'}
        </span>
      </div>

       <div className="mt-6 text-right">
        <button
          onClick={() => navigate(`/blogs/${id}/edit`)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded"
        >
          Edit Blog
        </button>
      </div>
    </div>
  );
};

export default BlogDetails;
