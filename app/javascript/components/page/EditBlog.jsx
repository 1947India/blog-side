import React, { useEffect, useState } from 'react';
import { getBlog, updateBlog, deleteBlog } from '../blogs/blogAPI';
import { useParams, useNavigate } from 'react-router-dom';

const EditBlog = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [published, setPublished] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      const token = localStorage.getItem('authToken');
      const res = await getBlog(id, token);
      setTitle(res.data.title);
      setContent(res.data.content);
      setTags(res.data.tags);
      setPublished(res.data.published)
    };
    fetch();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    await updateBlog(id, { title, content,tags,published
      
     }, token);
    alert('Updated');
    navigate('/home');
  };
  const handleDelete = async () => {
    const token = localStorage.getItem('authToken');
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
    if (confirmDelete) {
      try {
        await deleteBlog(id, token);  
        alert('Blog deleted!');
        navigate('/home');  
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create a New Blog</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Blog title"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
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
          Update Blog
        </button>
        <button
          onClick={handleDelete}
          className="text-white bg-gradient-to-r from-red-500 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mb-2"
        >
          Delete Blog
        </button>
      </form>
    </div>
  );
};
export default EditBlog;