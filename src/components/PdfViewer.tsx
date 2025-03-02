import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PdfViewerProps {
  pdfUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleLoadError = (error: Error) => {
    console.error('PDF load error:', error);
  };

  return (
    <div>
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={handleLoadError}
      >
        <Page 
          pageNumber={pageNumber}
          renderAnnotationLayer={false}
          renderTextLayer={false}
        />
      </Document>
      <p>Page {pageNumber} of {numPages}</p>
      <button 
        disabled={pageNumber <= 1} 
        onClick={() => setPageNumber(prev => prev - 1)}
      >
        Previous
      </button>
      <button 
        disabled={pageNumber >= (numPages || 0)} 
        onClick={() => setPageNumber(prev => prev + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default PdfViewer;