import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('blogger');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setFieldErrors({});

    try {
      const response = await axios.post('http://localhost:3000/signup', {
        name,
        email,
        role,
        password,
        password_confirmation: passwordConfirmation,
      });

      console.log('Signup Success:', response.data);
      navigate('/login');
    } catch (error) {
      const backendErrors = error.response?.data?.errors || {};
      const newFieldErrors = {};

      Object.keys(backendErrors).forEach((field) => {
        const reactField =
          field === 'password_confirmation' ? 'passwordConfirmation' : field;

        newFieldErrors[reactField] = backendErrors[field].join(', ');
      });

      setFieldErrors(newFieldErrors);
    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create User</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="w-full border p-2 rounded-md mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}

            />
            {fieldErrors.name && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border p-2 rounded-md mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {fieldErrors.email && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              className="w-full border p-2 rounded-md mt-1"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="blogger">Blogger</option>
              <option value="admin">Admin</option>
            </select>
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
            {fieldErrors.password && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.password}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="w-full border p-2 rounded-md mt-1"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
            />
            {fieldErrors.passwordConfirmation && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.passwordConfirmation}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
