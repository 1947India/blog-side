import React, { useEffect, useState } from 'react';
import { getAllPublished } from '../blogs/blogAPI';
import Home from '../auth/Home'
const PublishedList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchPublishedBlogs = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const res = await getAllPublished(token);
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching published blogs", error);
      }
    };

    fetchPublishedBlogs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Published Blogs</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
              <th className="border-b p-4">Title</th>
              <th className="border-b p-4">Author</th>
              <th className="border-b p-4">Tags</th>
              <th className="border-b p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <tr
                key={blog.id}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition`}
              >
                <td className="p-4 border-b text-gray-700">{blog.title}</td>
                <td className="p-4 border-b text-gray-700">
                {blog.user ? blog.user.name : 'Unknown Author'}
                </td>
                <td className="p-4 border-b text-gray-700">
                  {blog.tags}
                </td>
                <td className="p-4 border-b">
                  <button className="text-blue-600 hover:text-blue-800 font-medium transition">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PublishedList;
