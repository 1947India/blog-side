import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, } from 'react-router-dom';
import { searchBlog, getAllUsers, getAllPublished } from '../blogs/blogAPI'
const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem('authToken');

      const response = await axios.get('http://localhost:3000/blogs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      console.log('API Response:', response.data);
      const blogData = Array.isArray(response.data)
        ? response.data
        : response.data.blogs;

      setBlogs(blogData || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      fetchBlogs();
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await searchBlog(searchTerm, token);
      const blogData = Array.isArray(response.data)
        ? response.data
        : response.data.blogs;
      setBlogs(blogData || []);
    } catch (error) {
      console.error('Error searching blogs:', error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Blog Side</h1>
          <p className="mt-4 text-lg text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam incidunt minus adipisci temporibus soluta illo cum fugiat aliquid quos asperiores cumque.
          </p>
        </header>
        <form className="max-w-lg mx-auto" onSubmit={handleSearch}>
          <div className="flex">
            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                value={searchTerm}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchTerm(value);
                  if (value.trim() === '') {
                    fetchBlogs();
                  }
                }}
                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search blogs..."
              />

            </div>
          </div>
        </form>
        {/* <button
          onClick={() => navigate('/blogs/published')}
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          unpublished blogs
        </button>

        <button
          onClick={() => navigate('/users')}
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Users
        </button>
        <button
          onClick={() => navigate('/blogs/new')}
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Create Blog
        </button>
        <button
          onClick={handleLogout}
          type="button"
          className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Logout
        </button> */}
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {Array.isArray(blogs) && blogs.map((blog, index) => (
            <div
              key={blog.id}
              onClick={() => navigate(`/blogs/${blog.id}/edit`)}
              className="cursor-pointer max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <a href="#" className="block">
                <img
                  src={`https://picsum.photos/300/200?random=${index + 1}`}
                  alt={`Blog ${blog.id}`}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
              </a>

              <div className="p-4">
                <a href="#">
                  <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600">
                    {blog.title}
                  </h2>
                </a>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                  {blog.content}
                </p>
              </div>

              <div className="px-4 pb-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    src={`https://api.dicebear.com/8.x/thumbs/svg?seed=user${blog.user_id}`}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-sm text-gray-700">User{blog.user_id}</span>
                </div>
                <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  #{Array.isArray(blog.tags) && blog.tags.length > 0 ? blog.tags.join(', ') : 'General'}
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Home;
