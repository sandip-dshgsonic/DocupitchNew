'use client';

import { ChartBarIcon, CloudArrowUpIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { useDocumentStore } from '../../../app/store/documentStore'; // by aniket
// import { useDocumentStore } from '../../store/documentStore';

export default function UploadStats() {
  const documents = useDocumentStore(state => state.documents);

  // Calculate total storage used
  const totalStorage = documents.reduce((acc, doc) => acc + doc.size, 0);
  
  // Format storage size
  const formatStorage = (bytes: number) => {
    if (bytes === 0) return '0 MB';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get recent activity count (documents uploaded in the last 24 hours)
  const recentActivity = documents.filter(doc => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return new Date(doc.uploadDate) > yesterday;
  }).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
        <div className="flex items-center space-x-3">
          <DocumentTextIcon className="w-8 h-8 text-orange-500" />
          <div>
            <h4 className="text-lg font-semibold dark:text-white">Total Documents</h4>
            <p className="text-2xl font-bold text-orange-600">{documents.length}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
        <div className="flex items-center space-x-3">
          <CloudArrowUpIcon className="w-8 h-8 text-orange-500" />
          <div>
            <h4 className="text-lg font-semibold dark:text-white">Storage Used</h4>
            <p className="text-2xl font-bold text-orange-600">{formatStorage(totalStorage)}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
        <div className="flex items-center space-x-3">
          <ChartBarIcon className="w-8 h-8 text-orange-500" />
          <div>
            <h4 className="text-lg font-semibold dark:text-white">Recent Activity</h4>
            <p className="text-2xl font-bold text-orange-600">{recentActivity}</p>
          </div>
        </div>
      </div>
    </div>
  );
}