import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '../blogs/blogAPI';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [published, setPublished] = useState(true);
  const [fieldErrors, setFieldErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    const token = localStorage.getItem('authToken');

    const blogData = {
      title,
      content,
      tags,
      published,
    };

    try {
      await createBlog(blogData, token);
      alert('Blog created successfully!');
      navigate('/home');
    } catch (err) {
      console.error('Error creating blog:', err);

      const apiErrors = err.response?.data?.errors || [];
      const newFieldErrors = {};

      apiErrors.forEach((errorMsg) => {

        if (errorMsg.toLowerCase().includes('title')) {
          newFieldErrors.title = errorMsg;
        }
        if (errorMsg.toLowerCase().includes('content')) {
          newFieldErrors.content = errorMsg;
        }
      });

      setFieldErrors(newFieldErrors);
    }

  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create a New Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Blog title"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"

          />
          {fieldErrors.title && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Blog content"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-32"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
          <input
            type="text"
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="e.g. rails,api,development"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="flex items-center">
          <input
            id="published"
            type="checkbox"
            checked={published}
            onChange={e => setPublished(e.target.checked)}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
          <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
            Publish now
          </label>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
