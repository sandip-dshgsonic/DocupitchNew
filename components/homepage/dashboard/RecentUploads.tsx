'use client';

import { DocumentIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { useDocumentStore } from '../../../app/store/documentStore'; // by aniket
// import { useDocumentStore } from '../../store/documentStore';

export default function RecentUploads() {
  const { documents, removeDocument } = useDocumentStore();
  const recentDocuments = documents.slice(0, 5); // Show 5 most recent

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4 dark:text-white">Recent Uploads</h3>
      {recentDocuments.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
          No documents uploaded yet
        </p>
      ) : (
        <div className="space-y-2">
          {recentDocuments.map((doc) => (
            <div 
              key={doc.id}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <DocumentIcon className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="font-medium dark:text-white">{doc.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(doc.uploadDate)} • {formatFileSize(doc.size)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <a 
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-500 hover:text-orange-500 transition-colors"
                >
                  <EyeIcon className="w-5 h-5" />
                </a>
                <button 
                  onClick={() => removeDocument(doc.id)}
                  className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}