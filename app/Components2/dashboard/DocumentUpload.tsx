'use client';

import { useState } from 'react';
import { CloudArrowUpIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useDocumentStore, Document as UploadedDocument  } from '../../store/documentStore';
import LoadingOverlay from './LoadingOverlay';

export default function DocumentUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  // const addDocument = useDocumentStore(state => state.addDocument);

  // by aniket
  // const addDocument = useDocumentStore((state: { addDocument: (doc: Document) => void }) => state.addDocument);
  const addDocument = useDocumentStore((state) => state.addDocument);

  //by aniket end

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    
    try {
      // Process each file
      for (const file of files) {
        // In a real app, you would upload to a server here
        const doc = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          uploadDate: new Date(),
          url: URL.createObjectURL(file) // In real app, this would be server URL
        };
        
        addDocument(doc);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      // Handle error (show error message to user)
    }
    
    setUploading(false);
    setFiles([]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Upload Pitch</h1>
      
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors
                   ${isDragging 
                     ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' 
                     : 'border-gray-300 dark:border-gray-700'}`}
      >
        <CloudArrowUpIcon className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
        <h3 className="text-xl font-semibold mb-2 dark:text-white">
          Drop your documents here
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          or click to browse from your computer
        </p>
        <input
          type="file"
          className="hidden"
          id="fileInput"
          multiple
          onChange={handleFileSelect}
          accept=".pdf,.doc,.docx,.ppt,.pptx"
        />
        <button
          onClick={() => document.getElementById('fileInput')?.click()}
          className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 
                   transition-colors font-semibold"
        >
          Select Files
        </button>
      </div>

      {files.length > 0 && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold dark:text-white">Selected Files</h3>
            <button
              onClick={handleUpload}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 
                       transition-colors font-semibold"
            >
              Upload All
            </button>
          </div>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
              >
                <span className="text-gray-700 dark:text-gray-300">{file.name}</span>
                <button
                  onClick={() => removeFile(index)}
                  className="text-gray-500 hover:text-red-500 transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {uploading && <LoadingOverlay message="Uploading documents..." />}
    </div>
  );
}