"use client"
import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface AddWebsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (url: string) => void;
}

const AddWebsiteModal: React.FC<AddWebsiteModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const urlObj = new URL(url);
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        setError('URL must start with http:// or https://');
        return;
      }
      
      onAdd(url);
      setUrl('');
      setError('');
      onClose();
    } catch {
      setError('Please enter a valid URL (e.g., https://example.com)');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all animate-fadeIn">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Add New Website</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="website-url" className="block text-sm font-medium text-gray-700 mb-1">
                Website URL
              </label>
              <input
                type="text"
                id="website-url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
              {error && <p className="mt-1 text-sm text-rose-600">{error}</p>}
            </div>
            
            <div className="flex justify-end gap-3 mt-5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-1.5" />
                Add Website
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddWebsiteModal;