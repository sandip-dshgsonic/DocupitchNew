// 'use client';

// import { create } from 'zustand';

// export interface Document {
//   id: string;
//   name: string;
//   size: number;
//   type: string;
//   uploadDate: Date;
//   url: string;
// }

// interface DocumentStore {
//   documents: Document[];
//   addDocument: (doc: Document) => void;
//   removeDocument: (id: string) => void;
//   getRecentDocuments: () => Document[];
// }

// export const useDocumentStore = create<DocumentStore>((set, get) => ({
//   documents: [],
  
//   addDocument: (doc) => {
//     set((state) => ({
//       documents: [doc, ...state.documents]
//     }));
//   },
  
//   removeDocument: (id) => {
//     set((state) => ({
//       documents: state.documents.filter(doc => doc.id !== id)
//     }));
//   },
  
//   getRecentDocuments: () => {
//     return get().documents.slice(0, 5); // Get 5 most recent documents
//   }
// }));
// 


// by aniket
'use client';

import { create } from 'zustand';

export interface Document {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: Date;
  url: string;
}

export interface DocumentStore {
  documents: Document[];
  addDocument: (doc: Document) => void;
  removeDocument: (id: string) => void;
  getRecentDocuments: () => Document[];
}

export interface UploadedDocument {
  id: string;
  name: string;
  uploadDate: Date;
  size: number;
  url: string;
}

export const useDocumentStore = create<DocumentStore>((set, get) => ({
  documents: [],
  
  addDocument: (doc) => {
    set((state) => ({
      documents: [doc, ...state.documents]
    }));
  },
  
  removeDocument: (id) => {
    set((state) => ({
      documents: state.documents.filter(doc => doc.id !== id)
    }));
  },
  
  getRecentDocuments: () => {
    return get().documents.slice(0, 5); // Get 5 most recent documents
  }
}));


// by aniket end