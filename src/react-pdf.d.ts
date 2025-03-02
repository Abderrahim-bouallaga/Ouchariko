declare module 'react-pdf' {
    import { ComponentType, CSSProperties } from 'react';
  
    interface DocumentProps {
      file: string | File | Blob;
      onLoadSuccess?: (document: { numPages: number }) => void;
      onLoadError?: (error: Error) => void; // Add this line
      children?: React.ReactNode;
      style?: CSSProperties;
    }
  
    interface PageProps {
      pageNumber: number;
      width?: number;
      style?: CSSProperties;
      renderAnnotationLayer?: boolean; // Add this line
      renderTextLayer?: boolean; // Add this line
    }
  
    export const Document: ComponentType<DocumentProps>;
    export const Page: ComponentType<PageProps>;
    export const pdfjs: {
      GlobalWorkerOptions: {
        workerSrc: string;
      };
      version: string;
    };
  }