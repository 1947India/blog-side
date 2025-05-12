import React, { useEffect, useState } from 'react';
import { getAllUsers, updateUser } from '../blogs/blogAPI';
import { useNavigate } from 'react-router-dom';
import UserEditModal from '../users/UserEditModal';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('authToken');
      const res = await getAllUsers(token);
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const handleSaveUser = async (userId, formData) => {
    try {
      const token = localStorage.getItem('authToken');
      await updateUser(userId, formData, token); // PATCH request
  
      // Update local users list after successful edit
      const res = await getAllUsers(token);
      setUsers(res.data);
  
      setIsModalOpen(false); // Close modal
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">All Users</h2>
      <button
        onClick={() => navigate('/signup')}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Add New User
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
              <th className="border-b p-4">Name</th>
              <th className="border-b p-4">Email</th>
              <th className="border-b p-4">Role</th>
              <th className="border-b p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 transition`}
              >
                <td className="p-4 border-b text-gray-700">{user.name}</td>
                <td className="p-4 border-b text-gray-700">{user.email}</td>
                <td className="p-4 border-b text-gray-700 capitalize">{user.role}</td>
                <td className="p-4 border-b">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setIsModalOpen(true); 
                    }}
                    className="text-blue-600 hover:text-blue-800 font-medium transition"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <UserEditModal 
          user={selectedUser} 
          onClose={() => setIsModalOpen(false)} 
          onSave={handleSaveUser} 
        />
      )}
    </div>
  );
};

export default UserList;
