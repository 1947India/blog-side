// AppRouter.js
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // ✅ Yeh line fix ki
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import PublishedList from '../blogs/publishedList';
import UserList from '../users/userList';
import CreateBlog from '../page/CreateBlog';
import EditBlog from '../page/EditBlog';
import Layout from '../header/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import BlogDetails from '../blogs/BlogDetails';

const AppRouter = () => {
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Layout onLogout={handleLogout}><Home /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs/published"
          element={
            <ProtectedRoute>
              <Layout onLogout={handleLogout}><PublishedList /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Layout onLogout={handleLogout}><UserList /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs/new"
          element={
            <ProtectedRoute>
              <Layout onLogout={handleLogout}><CreateBlog /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs/:id/edit"
          element={
            <ProtectedRoute>
              <Layout onLogout={handleLogout}><EditBlog /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/blogs/:id"
          element={
            <ProtectedRoute>
              <Layout onLogout={handleLogout}><BlogDetails /></Layout>
            </ProtectedRoute>
          }
        />


      </Routes>
    </Router>
  );
};

export default AppRouter;
