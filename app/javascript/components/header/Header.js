// components/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap gap-2 mb-6 justify-center">
      <button
        onClick={() => navigate('/Home')}
        className="text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Home
      </button>
      <button
        onClick={() => navigate('/blogs/published')}
        className="text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Unpublished Blogs
      </button>

      <button
        onClick={() => navigate('/users')}
        className="text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Users
      </button>

      <button
        onClick={() => navigate('/blogs/new')}
        className="text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Create Blog
      </button>

      <button
        onClick={onLogout}
        type="button"
        className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
