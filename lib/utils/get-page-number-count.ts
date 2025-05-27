import { Document, Page, pdfjs } from "react-pdf";
// import { Document, Page } from "react-pdf";
// import pdfjs from 'pdfjs-dist';

import * as XLSX from "xlsx";

// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;
// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/legacy/pdf.worker.min.js`;

// pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js';
// import { GlobalWorkerOptions } from 'pdfjs-dist';
// import * as pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs';

// Set the workerSrc to the correct path
// GlobalWorkerOptions.workerSrc = pdfWorker.default || pdfWorker;

export const getPagesCount = async (arrayBuffer: ArrayBuffer) => {
  try {
    const pdf = await pdfjs.getDocument(arrayBuffer).promise;
    return pdf.numPages;
  } catch (error) {
    console.log("error get page number count ts ",error)
  }

};

export const getSheetsCount = (arrayBuffer: ArrayBuffer) => {
  try {
    const data = new Uint8Array(arrayBuffer);
    const workbook = XLSX.read(data, { type: "array" });
    return workbook.SheetNames.length ?? 1;
  } catch (error) {
    console.log("error get page number count ts =2 ",error)
  }

};
