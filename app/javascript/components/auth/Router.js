// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import PublishedList from '../blogs/publishedList';
import UserList from '../users/userList';
import CreateBlog from '../page/CreateBlog';
import EditBlog from '../page/EditBlog';
import Layout from '../header/Layout';

const AppRouter = () => {
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes with Header */}
        <Route path="/home" element={<Layout onLogout={handleLogout}><Home /></Layout>} />
        <Route path="/blogs/published" element={<Layout onLogout={handleLogout}><PublishedList /></Layout>} />
        <Route path="/users" element={<Layout onLogout={handleLogout}><UserList /></Layout>} />
        <Route path="/blogs/new" element={<Layout onLogout={handleLogout}><CreateBlog /></Layout>} />
        <Route path="/blogs/:id/edit" element={<Layout onLogout={handleLogout}><EditBlog /></Layout>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
