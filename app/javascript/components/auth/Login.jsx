import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your API
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
      }, { withCredentials: true });  // Send credentials (cookies)

      // Check if the response is successful
      if (response.data.message === 'Login successful') {
        console.log('Login Successful:', response.data);

        // Store the token in localStorage
        localStorage.setItem('authToken', response.data.token);

        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Redirect to the Home page upon successful login
        navigate('/home');
      } else {
        alert('Login failed: ' + response.data.message);  // Show a failure message
      }
    } catch (error) {
      console.error('Login Failed:', error);
      alert('Login failed. Please try again.');
    }
  };


  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border p-2 rounded-md mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full border p-2 rounded-md mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
