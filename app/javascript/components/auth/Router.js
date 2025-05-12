import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import PublishedList from '../blogs/publishedList';
import UserList from '../users/userList';
import CreateBlog from '../page/CreateBlog'
import EditBlog from '../page/EditBlog';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blogs/published" element={<PublishedList />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/blogs/new" element={<CreateBlog />} />
        <Route path="/blogs/:id/edit" element={<EditBlog />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
